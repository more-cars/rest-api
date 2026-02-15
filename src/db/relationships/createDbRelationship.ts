import neo4j, {Driver, Relationship} from "neo4j-driver"
import {DbRelationship} from "../types/DbRelationship"
import {getRelationshipSpecification} from "./getRelationshipSpecification"
import {DbRelationshipName} from "../types/DbRelationshipName"
import {RelationshipDirection} from "../types/RelationshipDirection"
import {getDriver} from "../driver"
import {generateMoreCarsId} from "../generateMoreCarsId"
import {extractBaseIdFromElementId} from "../extractBaseIdFromElementId"
import {addMoreCarsIdToRelationship} from "./addMoreCarsIdToRelationship"
import {addTimestampsToRelationship} from "./addTimestampsToRelationship"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function createDbRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipType: DbRelationship
): Promise<false | Relationship> {
    const relationshipSpecs = getRelationshipSpecification(relationshipType)
    const dbRelationshipName = relationshipSpecs.relationshipName
    const relationshipDirection = relationshipSpecs.isReverseRelationship ? RelationshipDirection.REVERSE : RelationshipDirection.FORWARD

    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    // 1. Creating the rel in the database
    const records = await session.executeWrite(async txc => {
        const result = await txc.run(createRelationshipQuery(startNodeId, dbRelationshipName, endNodeId, relationshipDirection))
        return result.records
    })

    if (records.length === 0) {
        await session.close()
        return false
    }

    let dbRelationship: Relationship = records[0].get('r')

    // 2. Adding a custom More Cars ID for that relationship
    const elementId = dbRelationship.elementId
    const moreCarsId = generateMoreCarsId(extractBaseIdFromElementId(elementId))
    dbRelationship = await addMoreCarsIdToRelationship(elementId, moreCarsId)

    // 3. Adding timestamps
    const timestamp = new Date().toISOString()
    dbRelationship = await addTimestampsToRelationship(elementId, timestamp, timestamp)

    await session.close()

    return dbRelationship
}

export function createRelationshipQuery(startNodeId: number, relationshipName: DbRelationshipName, endNodeId: number, reverse: RelationshipDirection) {
    const templateName = reverse ? 'createRelationshipReversed' : 'createRelationship'

    return getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('relationshipName', relationshipName)
        .replace('$startNodeId', startNodeId.toString())
        .replace('$endNodeId', endNodeId.toString())
}
