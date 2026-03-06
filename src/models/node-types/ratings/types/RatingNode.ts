import type {ModelNodeType} from "../../../types/ModelNodeType"

export type RatingNode = {
    node_type: ModelNodeType.Rating
    attributes: {
        id: number
        rating_value: number
        scale_minimum: number
        scale_maximum: number
        scale_direction: string

        created_at: string
        updated_at: string
    }
}
