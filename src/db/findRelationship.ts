import {Driver, Node, Relationship, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "./driver"
import {BaseRelationship} from "../types/BaseRelationship"

/**
 * Searches for an existing relationship for the given node, which matches the provided relationship name.
 * If there exists none then false is returned.
 *
 * ⚠️
 * When there exist multiple relationships then only one of them will be returned (which is not necessarily the first one).
 */
export async function findRelationship(nodeId: number, relationshipName: string): Promise<false | BaseRelationship> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const relationship = await getRel(nodeId, relationshipName, driver)

    await session.close()
    await closeDriver(driver)

    return relationship
}

async function getRel(nodeId: number, relationshipName: string, driver: Driver): Promise<false | BaseRelationship> {
    const {records} = await driver.executeQuery(`
            MATCH (a {mc_id: $nodeId})-[r:${relationshipName}]-(b)
            RETURN r, b
            LIMIT 1`,
        {
            nodeId,
        },
    )

    if (records.length === 0) {
        return false
    }

    const relation: Relationship = records[0].get('r')
    const partnerNode: Node = records[0].get('b')

    const rel: BaseRelationship = {
        start_node_id: nodeId,
        end_node_id: partnerNode.properties.mc_id,
        relationship_id: relation.properties.mc_id,
        relationship_name: relationshipName,
    }

    return rel
}
