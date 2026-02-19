import neo4j, {Driver, Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import type {RelationshipType} from "../types/RelationshipType"
import type {NodeTypeLabel} from "../NodeTypeLabel"
import type {Relationship} from "../types/Relationship"
import {getRelationshipSpecification} from "./getRelationshipSpecification"
import {RelationshipDirection} from "../types/RelationshipDirection"
import {getDriver} from "../driver"
import {RelationshipTypeNeo4j} from "../types/RelationshipTypeNeo4j"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"

export async function getRelationshipByEndNode(
    endNodeId: number,
    relationshipType: RelationshipType,
    startNodeType: NodeTypeLabel,
): Promise<false | Relationship> {
    const relationshipSpecs = getRelationshipSpecification(relationshipType)
    const dbRelationshipName = relationshipSpecs.relationshipName
    const relationshipDirection = relationshipSpecs.isReverseRelationship ? RelationshipDirection.REVERSE : RelationshipDirection.FORWARD

    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getRelationshipQuery(endNodeId, dbRelationshipName, startNodeType, relationshipDirection))
        return result.records
    })

    await session.close()

    if (records.length === 0) {
        return false
    }

    const sourceNode: Node = records[0].get('a')
    const dbRelation: Neo4jRelationship = records[0].get('r')
    const endNode: Node = records[0].get('b')

    const relation: Relationship = {
        id: dbRelation.properties.mc_id,
        type: relationshipType,
        start_node_id: sourceNode.properties.mc_id,
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
        relationship_name: relationshipType,
        created_at: dbRelation.properties.created_at,
        updated_at: dbRelation.properties.updated_at,
    }

    return relation
}

export function getRelationshipQuery(endNodeId: number, relationshipName: RelationshipTypeNeo4j, startNodeLabel: NodeTypeLabel, reverse: RelationshipDirection) {
    const templateName = reverse ? 'getRelationshipByEndNodeReversed' : 'getRelationshipByEndNode'

    return getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('$startNodeLabel', getNamespacedNodeTypeLabel(startNodeLabel))
        .replace('relationshipName', relationshipName)
        .replace('$endNodeId', endNodeId.toString())
}
