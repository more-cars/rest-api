import {Relationship as Neo4jRelationship} from "neo4j-driver"
import {Relationship} from "../types/Relationship"
import type {RelationshipType} from "../types/RelationshipType"
import {BaseNode} from "../types/BaseNode"

export function convertNeo4jRelationshipToDbRelationship(
    startNode: BaseNode,
    endNode: BaseNode,
    relationshipType: RelationshipType,
    dbRelationship: Neo4jRelationship,
) {
    const relationship: Relationship = {
        id: dbRelationship.properties.mc_id,
        type: relationshipType,
        start_node: startNode,
        end_node: endNode,
        end_node_id: endNode.id,
        created_at: dbRelationship.properties.created_at,
        updated_at: dbRelationship.properties.updated_at,
    }

    return relationship
}
