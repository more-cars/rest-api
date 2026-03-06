import {ControllerNodeType} from "../../../types/ControllerNodeType"

export type RatingNode = {
    node_type: ControllerNodeType.Rating
    fields: {
        id: number
        rating_value: number
        scale_minimum: number
        scale_maximum: number
        scale_direction: string
        created_at: string
        updated_at: string
    }
}
