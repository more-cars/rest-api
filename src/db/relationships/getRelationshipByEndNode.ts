import neo4j, {Driver, Node, Relationship} from "neo4j-driver"
import type {DbRelationship} from "../types/DbRelationship"
import type {NodeTypeLabel} from "../NodeTypeLabel"
import type {BaseRelationship} from "../types/BaseRelationship"
import {getRelationshipSpecification} from "./getRelationshipSpecification"
import {RelationshipDirection} from "../types/RelationshipDirection"
import {getDriver} from "../driver"
import {DbRelationshipName} from "../types/DbRelationshipName"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"

export async function getRelationshipByEndNode(
    endNodeId: number,
    relationshipType: DbRelationship,
    startNodeType: NodeTypeLabel,
): Promise<false | BaseRelationship> {
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
    const dbRelation: Relationship = records[0].get('r')
    const endNode: Node = records[0].get('b')

    const relation: BaseRelationship = {
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
        relationship_id: dbRelation.properties.mc_id,
        relationship_name: relationshipType,
        created_at: dbRelation.properties.created_at,
        updated_at: dbRelation.properties.updated_at,
    }

    return relation
}

export function getRelationshipQuery(endNodeId: number, relationshipName: DbRelationshipName, startNodeLabel: NodeTypeLabel, reverse: RelationshipDirection) {
    const templateName = reverse ? 'getRelationshipByEndNodeReversed' : 'getRelationshipByEndNode'

    return getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('$startNodeLabel', getNamespacedNodeTypeLabel(startNodeLabel))
        .replace('relationshipName', relationshipName)
        .replace('$endNodeId', endNodeId.toString())
}
