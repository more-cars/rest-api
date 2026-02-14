import neo4j, {Driver, Node, Relationship} from "neo4j-driver"
import type {DbRelationship} from "../types/DbRelationship"
import type {NodeTypeLabel} from "../NodeTypeLabel"
import {RelationshipDirection} from "../types/RelationshipDirection"
import type {BaseRelationship} from "../types/BaseRelationship"
import {getDriver} from "../driver"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function getRelationship(
    startNodeId: number,
    relationshipName: DbRelationship,
    endNodeType: NodeTypeLabel,
    reverse: RelationshipDirection,
): Promise<false | BaseRelationship> {
    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getRelationshipQuery(startNodeId, relationshipName, endNodeType, reverse))
        return result.records
    })

    if (records.length === 0) {
        return false
    }

    await session.close()

    const sourceNode: Node = records[0].get('a')
    const relation: Relationship = records[0].get('r')
    const endNode: Node = records[0].get('b')

    return {
        id: relation.properties.mc_id,
        type: relationshipName,
        start_node_id: startNodeId,
        start_node: Object.assign({}, sourceNode.properties, {
            id: sourceNode.properties.mc_id,
            created_at: sourceNode.properties.created_at,
            updated_at: sourceNode.properties.updated_at,
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
    } as BaseRelationship
}

export function getRelationshipQuery(startNodeId: number, relationshipName: DbRelationship, endNodeLabel: NodeTypeLabel, reverse: RelationshipDirection) {
    const templateName = reverse ? 'getRelationshipReversed' : 'getRelationship'

    return getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('$startNodeId', startNodeId.toString())
        .replace('relationshipName', relationshipName)
        .replace('$endNodeLabel', endNodeLabel)
}
