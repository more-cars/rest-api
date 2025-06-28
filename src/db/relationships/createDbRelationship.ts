import {Driver, Relationship, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver.ts"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate.ts"
import {addMoreCarsIdToRelationship} from "./addMoreCarsIdToRelationship.ts"
import {addTimestampsToRelationship} from "./addTimestampsToRelationship.ts"

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
    // Note: This seems pointless at first glance, because the More Cars ID is exactly the same as the Neo4j ID.
    //       The benefit: we can modify the More Cars ID anytime, while the Neo4j ID is always read-only.
    //       This will become relevant when migrating nodes from the old database.
    //       In that scenario we need to be able to carry over the existing IDs.
    const elementId = dbRelationship.elementId
    const elementIdSplit: Array<string> = elementId.split(':')
    const moreCarsId: number = parseInt(elementIdSplit[2])
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
