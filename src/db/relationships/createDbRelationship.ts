import {Driver, Relationship, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver.ts"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate.ts"
import {addMoreCarsIdToRelationship} from "./addMoreCarsIdToRelationship.ts"
import {addTimestampsToRelationship} from "./addTimestampsToRelationship.ts"
import {generateMoreCarsId} from "../generateMoreCarsId.ts"
import {extractBaseIdFromElementId} from "../extractBaseIdFromElementId.ts"

export async function createDbRelationship(startNodeId: number, endNodeId: number, relationshipName: string): Promise<false | Relationship> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    // 1. Creating the rel in the database
    const {records} = await driver.executeQuery(createRelationshipQuery(startNodeId, relationshipName, endNodeId))

    if (records.length === 0) {
        return false
    }

    let dbRelationship: Relationship = records[0].get('r')

    // 2. Adding a custom More Cars ID for that relationship
    const elementId = dbRelationship.elementId
    const moreCarsId = generateMoreCarsId(extractBaseIdFromElementId(elementId))
    dbRelationship = await addMoreCarsIdToRelationship(elementId, moreCarsId, driver)

    // 3. Adding timestamps
    const timestamp = new Date().toISOString()
    dbRelationship = await addTimestampsToRelationship(elementId, timestamp, driver)

    await session.close()
    await closeDriver(driver)

    return dbRelationship
}

export function createRelationshipQuery(startNodeId: number, relationshipName: string, endNodeId: number) {
    return getCypherQueryTemplate('relationships/_cypher/createRelationship.cypher')
        .trim()
        .replace('relationshipName', relationshipName)
        .replace('$startNodeId', startNodeId.toString())
        .replace('$endNodeId', endNodeId.toString())
}
