import neo4j, {Driver, Node, Relationship} from "neo4j-driver"
import {getDriver} from "../driver"
import {BaseRelationship} from "../types/BaseRelationship"
import {DbRelationship} from "../types/DbRelationship"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

/**
 * Searches for an existing relationship for the given node, which matches the provided relationship name.
 * If there exists none then false is returned.
 *
 * ⚠️
 * When there exist multiple relationships then only one of them will be returned (which is not necessarily the first one).
 */
export async function getRelationshipForSpecificNode(nodeId: number, relationshipName: DbRelationship): Promise<false | BaseRelationship> {
    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getRelationshipForSpecificNodeQuery(nodeId, relationshipName))
        return result.records
    })

    if (records.length === 0) {
        return false
    }

    await session.close()
    await driver.close()

    const relation: Relationship = records[0].get('r')
    const partnerNode: Node = records[0].get('b')

    const rel: BaseRelationship = {
        start_node_id: nodeId,
        end_node_id: partnerNode.properties.mc_id,
        relationship_id: relation.properties.mc_id,
        relationship_name: relationshipName,
        created_at: relation.properties.created_at,
        updated_at: relation.properties.updated_at,
    }

    return rel
}

export function getRelationshipForSpecificNodeQuery(nodeId: number, relationshipName: DbRelationship) {
    return getCypherQueryTemplate('relationships/_cypher/getRelationshipForSpecificNode.cypher')
        .trim()
        .replace('$nodeId', nodeId.toString())
        .replace('relationshipName', relationshipName)
}
