import {Relationship as Neo4jRelationship} from "neo4j-driver"
import {Relationship} from "../types/Relationship"

export function convertNeo4jRelationshipToDbRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipName: string,
    dbRelationship: Neo4jRelationship,
) {
    return {
        id: dbRelationship.properties.mc_id,
        start_node_id: startNodeId,
        end_node_id: endNodeId,
        relationship_name: relationshipName,
        created_at: dbRelationship.properties.created_at,
        updated_at: dbRelationship.properties.updated_at,
    } as Relationship
}
