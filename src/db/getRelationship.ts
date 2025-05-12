import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "./driver"
import {BaseRelationship} from "../types/BaseRelationship"

/**
 * Fetching the relationship between the two given nodes, which matches the provided relationship name.
 * If there exists none then false is returned.
 */
export async function getRelationship(startNodeId: number, endNodeId: number, relationshipName: string): Promise<false | BaseRelationship> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const relationship = await getRel(startNodeId, endNodeId, relationshipName, driver)

    await session.close()
    await closeDriver(driver)

    return relationship
}

async function getRel(startNodeId: number, endNodeId: number, relationshipName: string, driver: Driver): Promise<false | BaseRelationship> {
    const {records} = await driver.executeQuery(`
            MATCH (a {mc_id: $startNodeId})-[r:${relationshipName}]->({mc_id: $endNodeId})
            RETURN r
            LIMIT 1`,
        {
            startNodeId,
            endNodeId,
        },
    )

    if (records.length === 0) {
        return false
    }

    const fetchedDbRel: Node = records[0].get('r')

    const rel: BaseRelationship = {
        start_node_id: startNodeId,
        end_node_id: endNodeId,
        relationship_id: fetchedDbRel.properties.mc_id,
        relationship_name: relationshipName,
    }

    return rel
}
