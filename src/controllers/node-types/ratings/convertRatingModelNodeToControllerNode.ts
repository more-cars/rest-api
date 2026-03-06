import type {RatingNode as ModelRatingNode} from "../../../models/node-types/ratings/types/RatingNode"
import type {RatingNode} from "./types/RatingNode"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export function convertRatingModelNodeToControllerNode(modelNode: ModelRatingNode): RatingNode {
    return {
        node_type: ControllerNodeType.Rating,
        fields: {
            id: modelNode.attributes.id,
            rating_value: modelNode.attributes.rating_value,
            scale_minimum: modelNode.attributes.scale_minimum,
            scale_maximum: modelNode.attributes.scale_maximum,
            scale_direction: modelNode.attributes.scale_direction,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies RatingNode
}
