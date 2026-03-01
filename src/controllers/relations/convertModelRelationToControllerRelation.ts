import type {Rel} from "../../models/relationships/types/Rel"
import type {Relation} from "../types/Relation"
import {mapModelRelationTypeToControllerRelationType} from "./mapModelRelationTypeToControllerRelationType"
import {convertModelNodeToControllerNode} from "../nodes/convertModelNodeToControllerNode"

export function convertModelRelationToControllerRelation(modelRelation: Rel): Relation {
    return {
        id: modelRelation.id,
        type: mapModelRelationTypeToControllerRelationType(modelRelation.type),
        from_node: convertModelNodeToControllerNode(modelRelation.origin),
        to_node: convertModelNodeToControllerNode(modelRelation.destination),
        created_at: modelRelation.created_at,
        updated_at: modelRelation.updated_at,
    } satisfies Relation
}
