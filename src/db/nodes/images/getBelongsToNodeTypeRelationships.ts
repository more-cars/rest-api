import neo4j, {type Driver, type Node, type Relationship} from "neo4j-driver"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import type {BaseRelationship} from "../../types/BaseRelationship"
import {getDriver} from "../../driver"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"

export async function fetchImageRelationshipsForNodeType(nodeType: NodeTypeLabel, imageId: number) {
    const relationships: BaseRelationship[] = []

    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getImageBelongsToNodeTypeRelationshipsQuery(imageId, nodeType))
        return result.records
    })

    await session.close()
    await driver.close()

    records.forEach((record) => {
        const startNode: Node = record.get('a')
        const relationship: Relationship = record.get('r')
        const endNode: Node = record.get('b')

        relationships.push({
            id: relationship.properties.mc_id,
            relationship_id: relationship.properties.mc_id,
            type: relationship.type,
            relationship_name: relationship.type,
            start_node: Object.assign({}, startNode.properties, {
                id: startNode.properties.mc_id,
                created_at: startNode.properties.created_at,
                updated_at: startNode.properties.updated_at,
            }),
            start_node_id: startNode.properties.mc_id,
            end_node: Object.assign({}, endNode.properties, {
                id: endNode.properties.mc_id,
                created_at: endNode.properties.created_at,
                updated_at: endNode.properties.updated_at,
            }),
            end_node_id: endNode.properties.mc_id,
            created_at: relationship.properties.created_at,
            updated_at: relationship.properties.updated_at,
        } as BaseRelationship)
    })

    return relationships
}

export function getImageBelongsToNodeTypeRelationshipsQuery(imageId: number, nodeType: NodeTypeLabel) {
    return getCypherQueryTemplate('nodes/images/_cypher/getBelongsToNodeTypeRelationships.cypher')
        .trim()
        .replace('$imageId', imageId.toString())
        .replace('targetNodeLabel', nodeType)
}
