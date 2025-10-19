import {GenericRelation} from "./types/GenericRelation"
import type {BaseRelationship} from "../../db/types/BaseRelationship"

export async function mapDbRelationshipToModelRelationship(relationship: BaseRelationship) {
    return {
        id: relationship.id || relationship.relationship_id,
        type: relationship.type || relationship.relationship_name,
        origin: relationship.start_node,
        destination: relationship.end_node,
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    } as GenericRelation
}
