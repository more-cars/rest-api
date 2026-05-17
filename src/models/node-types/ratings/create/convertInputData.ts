import type {RatingInput} from "../types/RatingInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: RatingInput): DbInputData {
    return {
        rating_value: data.rating_value,
        scale_minimum: data.scale_minimum,
        scale_maximum: data.scale_maximum,
        scale_direction: data.scale_direction,
    }
}
