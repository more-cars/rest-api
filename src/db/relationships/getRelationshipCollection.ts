import neo4j, {Driver, Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import {getDriver} from "../driver"
import type {RelationshipType} from "../types/RelationshipType"
import type {NodeTypeLabel} from "../NodeTypeLabel"
import type {Relationship} from "../types/Relationship"
import {getRelationshipSpecification} from "./getRelationshipSpecification"
import {RelationshipDirection} from "../types/RelationshipDirection"
import type {RelationshipTypeNeo4j} from "../types/RelationshipTypeNeo4j"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"

export async function getRelationshipCollection(
    startNodeId: number,
    relationshipType: RelationshipType,
    endNodeType?: NodeTypeLabel,
): Promise<Relationship[]> {
    const relationshipSpecs = getRelationshipSpecification(relationshipType)
    const dbRelationshipName = relationshipSpecs.relationshipName
    const relationshipDirection = relationshipSpecs.isReverseRelationship ? RelationshipDirection.REVERSE : RelationshipDirection.FORWARD

    const relationships: Relationship[] = []

    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getRelationshipCollectionQuery(startNodeId, dbRelationshipName, relationshipDirection, endNodeType))
        return result.records
    })

    await session.close()

    records.forEach(record => {
        const startNode: Node = record.get('a')
        const relation: Neo4jRelationship = record.get('r')
        const endNode: Node = record.get('b')

        relationships.push({
            id: relation.properties.mc_id,
            type: relationshipType,
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
            relationship_name: relationshipType,
            created_at: relation.properties.created_at,
            updated_at: relation.properties.updated_at,
        })
    })

    return relationships
}

export function getRelationshipCollectionQuery(startNodeId: number, relationshipName: RelationshipTypeNeo4j, reverse: RelationshipDirection, endNodeType?: NodeTypeLabel) {
    const templateName = reverse ? 'getRelationshipCollectionReversed' : 'getRelationshipCollection'

    let template = getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('$startNodeId', startNodeId.toString())
        .replace('relationshipName', relationshipName)

    if (endNodeType) {
        template = template.replace('$endNodeLabel', getNamespacedNodeTypeLabel(endNodeType))
    } else {
        template = template.replace(':$endNodeLabel', '')
    }

    return template
}
