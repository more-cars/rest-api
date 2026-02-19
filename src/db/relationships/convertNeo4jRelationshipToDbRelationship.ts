import {Relationship as Neo4jRelationship} from "neo4j-driver"
import {Relationship} from "../types/Relationship"
import type {RelationshipType} from "../types/RelationshipType"

export function convertNeo4jRelationshipToDbRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipType: RelationshipType,
    dbRelationship: Neo4jRelationship,
) {
    const relationship: Relationship = {
        id: dbRelationship.properties.mc_id,
        type: relationshipType,
        start_node_id: startNodeId,
        end_node_id: endNodeId,
        created_at: dbRelationship.properties.created_at,
        updated_at: dbRelationship.properties.updated_at,
    }

    return relationship
}
