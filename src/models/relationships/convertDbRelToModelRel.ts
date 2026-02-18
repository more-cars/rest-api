import {Rel} from "./types/Rel"
import type {Relationship} from "../../db/types/Relationship"

export async function convertDbRelToModelRel(relationship: Relationship) {
    return {
        id: relationship.id || relationship.relationship_id,
        type: relationship.type || relationship.relationship_name,
        origin: relationship.start_node,
        destination: relationship.end_node,
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    } as Rel
}
