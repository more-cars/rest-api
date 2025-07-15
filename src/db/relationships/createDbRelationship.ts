import neo4j, {Driver, Relationship} from "neo4j-driver"
import {getDriver} from "../driver.ts"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate.ts"
import {addMoreCarsIdToRelationship} from "./addMoreCarsIdToRelationship.ts"
import {addTimestampsToRelationship} from "./addTimestampsToRelationship.ts"
import {generateMoreCarsId} from "../generateMoreCarsId.ts"
import {extractBaseIdFromElementId} from "../extractBaseIdFromElementId.ts"
import {DbRelationship} from "../types/DbRelationship.ts"

export async function createDbRelationship(startNodeId: number, endNodeId: number, relationshipName: DbRelationship): Promise<false | Relationship> {
    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    // 1. Creating the rel in the database
    const records = await session.executeWrite(async txc => {
        const result = await txc.run(createRelationshipQuery(startNodeId, relationshipName, endNodeId))
        return result.records
    })

    if (records.length === 0) {
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
    await driver.close()

    return dbRelationship
}

export function createRelationshipQuery(startNodeId: number, relationshipName: DbRelationship, endNodeId: number) {
    return getCypherQueryTemplate('relationships/_cypher/createRelationship.cypher')
        .trim()
        .replace('relationshipName', relationshipName)
        .replace('$startNodeId', startNodeId.toString())
        .replace('$endNodeId', endNodeId.toString())
}
