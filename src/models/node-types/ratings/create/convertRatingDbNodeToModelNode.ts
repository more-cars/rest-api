import {RatingNode as RatingNodeInput} from "../../../../db/node-types/ratings/types/RatingNode"
import {RatingNode} from "../types/RatingNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertRatingDbNodeToModelNode(data: RatingNodeInput): RatingNode {
    return {
        node_type: ModelNodeType.Rating,
        attributes: {
            id: data.properties.id,
            rating_value: data.properties.rating_value,
            scale_minimum: data.properties.scale_minimum,
            scale_maximum: data.properties.scale_maximum,
            scale_direction: data.properties.scale_direction,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies RatingNode
}
