import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver"
import {DbRelationship} from "../types/DbRelationship"
import {BaseRelationship} from "../types/BaseRelationship"
import {addMoreCarsIdToRelationship} from "./addMoreCarsIdToRelationship"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {addTimestampsToRelationship} from "./addTimestampsToRelationship"

/**
 * Creating a relationship between the two given nodes.
 * When the given nodes don't exist or the relationship name is invalid then the creation will be aborted.
 */
export async function createRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipName: DbRelationship
): Promise<false | BaseRelationship> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const createdRelationship = await createRel(startNodeId, endNodeId, relationshipName, driver)

    await session.close()
    await closeDriver(driver)

    return createdRelationship
}

async function createRel(
    startNodeId: number,
    endNodeId: number,
    relationshipName: DbRelationship,
    driver: Driver
): Promise<false | BaseRelationship> {
    // 1. Creating the rel in the database
    const {records} = await driver.executeQuery(createRelationshipQuery(startNodeId, relationshipName, endNodeId))

    if (records.length === 0) {
        return false
    }

    const createdDbRel: Node = records[0].get('r')

    // 2. Adding a custom More Cars ID for that rel
    // Note: This seems pointless at first glance, because the More Cars ID is exactly the same as the Neo4j ID.
    //       The benefit: we can modify the More Cars ID anytime, while the Neo4j ID is always read-only.
    //       This will become relevant when migrating nodes from the old database.
    //       In that scenario we need to be able to carry over the existing IDs.
    const elementId = createdDbRel.elementId
    const elementIdSplit: Array<string> = elementId.split(':')
    const moreCarsId: number = parseInt(elementIdSplit[2])
    await addMoreCarsIdToRelationship(elementId, moreCarsId, driver)

    // 3. Adding timestamps
    const timestamp = new Date().toISOString()
    const enrichedDbRel = await addTimestampsToRelationship(elementId, timestamp, driver)

    // 4. Converting the Neo4j node to a More Cars node // TODO the calling function should do this
    const rel: BaseRelationship = {
        start_node_id: startNodeId,
        end_node_id: endNodeId,
        relationship_id: enrichedDbRel.properties.mc_id,
        relationship_name: relationshipName,
        created_at: enrichedDbRel.properties.created_at,
        updated_at: enrichedDbRel.properties.updated_at,
    }

    return rel
}

export function createRelationshipQuery(startNodeId: number, relationshipName: string, endNodeId: number) {
    return getCypherQueryTemplate('relationships/_cypher/createRelationship.cypher')
        .trim()
        .replace('relationshipName', relationshipName)
        .replace('$startNodeId', startNodeId.toString())
        .replace('$endNodeId', endNodeId.toString())
}
