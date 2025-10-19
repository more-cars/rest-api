import {Relationship} from "neo4j-driver"
import {BaseRelationship} from "../types/BaseRelationship"

export function mapNeo4jRelationshipToDbRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipName: string,
    dbRelationship: Relationship,
) {
    return {
        start_node_id: startNodeId,
        end_node_id: endNodeId,
        relationship_id: dbRelationship.properties.mc_id,
        relationship_name: relationshipName,
        created_at: dbRelationship.properties.created_at,
        updated_at: dbRelationship.properties.updated_at,
    } as BaseRelationship
}
