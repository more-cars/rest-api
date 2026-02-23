import type {Relationship} from "../../db/types/Relationship"
import type {Rel} from "./types/Rel"
import {mapDbRelationshipTypeToModelRelType} from "./mapDbRelationshipTypeToModelRelType"
import {convertDbNodeToModelNode} from "../node-types/convertDbNodeToModelNode"

export function convertDbRelToModelRel(dbRelationship: Relationship) {
    const rel: Rel = {
        id: dbRelationship.id,
        type: mapDbRelationshipTypeToModelRelType(dbRelationship.type),
        origin: convertDbNodeToModelNode(dbRelationship.start_node),
        destination: convertDbNodeToModelNode(dbRelationship.end_node),
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    }

    return rel
}
