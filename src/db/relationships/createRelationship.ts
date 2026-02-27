import neo4j, {Driver, Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import {RelationshipType} from "../types/RelationshipType"
import {Relationship} from "../types/Relationship"
import {getRelationshipTypeSpecification} from "../../specification/getRelationshipTypeSpecification"
import {getDriver} from "../driver"
import {generateMoreCarsId} from "../generateMoreCarsId"
import {extractBaseIdFromElementId} from "../extractBaseIdFromElementId"
import {addMoreCarsIdToRelationship} from "./addMoreCarsIdToRelationship"
import {addTimestampsToRelationship} from "./addTimestampsToRelationship"
import {convertNeo4jRelationshipToDbRelationship} from "./convertNeo4jRelationshipToDbRelationship"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "./mapDbRelationshipTypeToNeo4jRelationshipType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function createRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipType: RelationshipType
): Promise<false | Relationship> {
    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    // 1. Creating the rel in the database
    const records = await session.executeWrite(async txc => {
        const result = await txc.run(createRelationshipQuery(startNodeId, relationshipType, endNodeId))
        return result.records
    })

    if (records.length === 0) {
        await session.close()
        return false
    }

    const startNode: Node = records[0].get('a')
    let dbRelationship: Neo4jRelationship = records[0].get('r')
    const endNode: Node = records[0].get('b')

    // 2. Adding a custom More Cars ID for that relationship
    const elementId = dbRelationship.elementId
    const moreCarsId = generateMoreCarsId(extractBaseIdFromElementId(elementId))
    dbRelationship = await addMoreCarsIdToRelationship(elementId, moreCarsId)

    // 3. Adding timestamps
    const timestamp = new Date().toISOString()
    dbRelationship = await addTimestampsToRelationship(elementId, timestamp, timestamp)

    await session.close()

    return convertNeo4jRelationshipToDbRelationship(dbRelationship, startNode, endNode)
}

export function createRelationshipQuery(startNodeId: number, relationshipType: RelationshipType, endNodeId: number) {
    const relationshipSpecs = getRelationshipTypeSpecification(relationshipType)
    const templateName = relationshipSpecs.isReverseRelationship ? 'createRelationshipReversed' : 'createRelationship'
    const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)

    return getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('relationshipName', relationshipName)
        .replace('$startNodeId', startNodeId.toString())
        .replace('$endNodeId', endNodeId.toString())
}
