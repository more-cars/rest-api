import {DbNodeType} from "../../../types/DbNodeType"

export type RatingNode = {
    node_type: DbNodeType.Rating,
    properties: {
        id: number
        created_at: string
        updated_at: string
        rating_value: number
        scale_minimum: number
        scale_maximum: number
        scale_direction: string
    }
}
