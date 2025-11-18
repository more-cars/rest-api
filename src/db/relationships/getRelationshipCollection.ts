import neo4j, {Driver, Node, Relationship} from "neo4j-driver"
import {getDriver} from "../driver"
import {BaseRelationship} from "../types/BaseRelationship"
import {DbRelationship} from "../types/DbRelationship"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function getRelationshipCollection(nodeId: number, relationshipName: DbRelationship, nodeIsRelationshipTarget = false): Promise<Array<BaseRelationship>> {
    const relationships: Array<BaseRelationship> = []

    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getRelationshipCollectionQuery(nodeId, relationshipName))
        return result.records
    })

    await session.close()
    await driver.close()

    records.forEach(record => {
        const startNode: Node = record.get('a')
        const relation: Relationship = record.get('r')
        const endNode: Node = record.get('b')

        relationships.push({
            id: relation.properties.mc_id,
            type: relationshipName,
            start_node_id: nodeIsRelationshipTarget ? endNode.properties.mc_id : nodeId,
            start_node: Object.assign({}, startNode.properties, {
                id: startNode.properties.mc_id,
                created_at: startNode.properties.created_at,
                updated_at: startNode.properties.updated_at,
            }),
            end_node_id: nodeIsRelationshipTarget ? nodeId : endNode.properties.mc_id,
            end_node: Object.assign({}, endNode.properties, {
                id: endNode.properties.mc_id,
                created_at: endNode.properties.created_at,
                updated_at: endNode.properties.updated_at,
            }),
            relationship_id: relation.properties.mc_id,
            relationship_name: relationshipName,
            created_at: relation.properties.created_at,
            updated_at: relation.properties.updated_at,
        })
    })

    return relationships
}

export function getRelationshipCollectionQuery(nodeId: number, relationshipName: DbRelationship) {
    return getCypherQueryTemplate('relationships/_cypher/getRelationshipCollection.cypher')
        .trim()
        .replace('$nodeId', nodeId.toString())
        .replace('relationshipName', relationshipName)
}
