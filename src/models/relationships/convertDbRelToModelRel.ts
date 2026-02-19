import type {Relationship} from "../../db/types/Relationship"
import {Rel} from "./types/Rel"
import {mapDbRelationshipTypeToModelRelType} from "./mapDbRelationshipTypeToModelRelType"
import {BaseNode} from "../../db/types/BaseNode"

export async function convertDbRelToModelRel(relationship: Relationship) {
    const rel: Rel = {
        id: relationship.id || relationship.relationship_id,
        type: mapDbRelationshipTypeToModelRelType(relationship.type),
        origin: relationship.start_node as BaseNode, // TODO return model node instead of db node
        destination: relationship.end_node as BaseNode, // TODO return model node instead of db node
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    }

    return rel
}
