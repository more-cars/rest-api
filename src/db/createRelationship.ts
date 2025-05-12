import {Driver, Node, Relationship, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "./driver"
import {BaseRelationship} from "../types/BaseRelationship"
import {addMoreCarsIdToRelationship} from "./addMoreCarsIdToRelationship"

/**
 * Creating a relationship between the two given nodes.
 *
 * ⚠️
 * The input data is assumed to be valid. It is not validated here.
 * When the given nodes don't exist or the relationship name is invalid then the db query will crash.
 */
export async function createRelationship(startNodeId: number, endNodeId: number, relationshipName: string): Promise<BaseRelationship> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const createdRelationship = await createRel(startNodeId, endNodeId, relationshipName, driver)

    await session.close()
    await closeDriver(driver)

    return createdRelationship
}

async function createRel(startNodeId: number, endNodeId: number, relationshipName: string, driver: Driver): Promise<BaseRelationship> {
    // 1. Creating the rel in the database
    const {records} = await driver.executeQuery(`
            MATCH (a {mc_id: $startNodeId}), (b {mc_id: $endNodeId})
            CREATE (a)-[r:${relationshipName}]->(b)
            RETURN r
            LIMIT 1`,
        {
            startNodeId,
            endNodeId,
        },
    )
    const createdDbRel: Node = records[0].get('r')

    // 2. Adding a custom More Cars ID for that rel
    // Note: This seems pointless at first glance, because the More Cars ID is exactly the same as the Neo4j ID.
    //       The benefit: we can modify the More Cars ID anytime, while the Neo4j ID is always read-only.
    //       This will become relevant when migrating nodes from the old database.
    //       In that scenario we need to be able to carry over the existing IDs.
    const elementId = createdDbRel.elementId
    const elementIdSplit: Array<string> = elementId.split(':')
    const moreCarsId: number = parseInt(elementIdSplit[2])
    const enrichedDbRel: Relationship = await addMoreCarsIdToRelationship(elementId, moreCarsId, driver)

    // 3. Converting the Neo4j node to a More Cars node
    const rel: BaseRelationship = {
        start_node_id: startNodeId,
        end_node_id: endNodeId,
        relationship_id: enrichedDbRel.properties.mc_id,
        relationship_name: relationshipName,
    }

    return rel
}
