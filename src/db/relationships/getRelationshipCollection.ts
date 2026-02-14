import neo4j, {Driver, Node, Relationship} from "neo4j-driver"
import {getDriver} from "../driver"
import {DbRelationship} from "../types/DbRelationship"
import {RelationshipDirection} from "../types/RelationshipDirection"
import {BaseRelationship} from "../types/BaseRelationship"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import type {NodeTypeLabel} from "../NodeTypeLabel"

export async function getRelationshipCollection(
    startNodeId: number,
    relationshipName: DbRelationship,
    endNodeType: NodeTypeLabel,
    reverse: RelationshipDirection,
): Promise<BaseRelationship[]> {
    const relationships: BaseRelationship[] = []

    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getRelationshipCollectionQuery(startNodeId, relationshipName, endNodeType, reverse))
        return result.records
    })

    await session.close()

    records.forEach(record => {
        const startNode: Node = record.get('a')
        const relation: Relationship = record.get('r')
        const endNode: Node = record.get('b')

        relationships.push({
            id: relation.properties.mc_id,
            type: relationshipName,
            start_node_id: startNodeId,
            start_node: Object.assign({}, startNode.properties, {
                id: startNode.properties.mc_id,
                created_at: startNode.properties.created_at,
                updated_at: startNode.properties.updated_at,
            }),
            end_node_id: endNode.properties.mc_id,
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

export function getRelationshipCollectionQuery(startNodeId: number, relationshipName: DbRelationship, endNodeLabel: NodeTypeLabel, reverse: RelationshipDirection) {
    const templateName = reverse ? 'getRelationshipCollectionReversed' : 'getRelationshipCollection'

    return getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('$startNodeId', startNodeId.toString())
        .replace('relationshipName', relationshipName)
        .replace('$endNodeLabel', endNodeLabel)
}
