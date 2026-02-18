import neo4j, {Node, Relationship} from "neo4j-driver"
import type {RelationshipType} from "../types/RelationshipType"
import type {BaseRelationship} from "../types/BaseRelationship"
import {getRelationshipSpecification} from "./getRelationshipSpecification"
import {RelationshipDirection} from "../types/RelationshipDirection"
import {getDriver} from "../driver"
import type {RelationshipTypeNeo4j} from "../types/RelationshipTypeNeo4j"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function getSpecificRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipType: RelationshipType,
): Promise<false | BaseRelationship> {
    const relationshipSpecs = getRelationshipSpecification(relationshipType)
    const dbRelationshipName = relationshipSpecs.relationshipName
    const relationshipDirection = relationshipSpecs.isReverseRelationship ? RelationshipDirection.REVERSE : RelationshipDirection.FORWARD

    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getSpecificRelationshipQuery(startNodeId, dbRelationshipName, endNodeId, relationshipDirection))
        return result.records
    })

    await session.close()

    if (records.length === 0) {
        return false
    }

    const sourceNode: Node = records[0].get('a')
    const dbRelationship: Relationship = records[0].get('r')
    const endNode: Node = records[0].get('b')

    const relationship: BaseRelationship = {
        id: dbRelationship.properties.mc_id,
        type: relationshipType,
        start_node_id: startNodeId,
        start_node: Object.assign({}, sourceNode.properties, {
            id: sourceNode.properties.mc_id,
            created_at: sourceNode.properties.created_at,
            updated_at: sourceNode.properties.updated_at,
        }),
        end_node_id: endNodeId,
        end_node: Object.assign({}, endNode.properties, {
            id: endNode.properties.mc_id,
            created_at: endNode.properties.created_at,
            updated_at: endNode.properties.updated_at,
        }),
        relationship_id: dbRelationship.properties.mc_id,
        relationship_name: relationshipType,
        created_at: dbRelationship.properties.created_at,
        updated_at: dbRelationship.properties.updated_at,
    }

    return relationship
}

export function getSpecificRelationshipQuery(startNodeId: number, relationshipName: RelationshipTypeNeo4j, endNodeId: number, reverse: RelationshipDirection) {
    const templateName = reverse ? 'getSpecificRelationshipReversed' : 'getSpecificRelationship'

    return getCypherQueryTemplate('relationships/_cypher/' + templateName + '.cypher')
        .trim()
        .replace('$startNodeId', startNodeId.toString())
        .replace('relationshipName', relationshipName)
        .replace('$endNodeId', endNodeId.toString())
}
