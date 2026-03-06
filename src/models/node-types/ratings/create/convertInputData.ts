import {CreateRatingInput} from "../types/CreateRatingInput"
import {InputRatingCreate} from "../../../../db/node-types/ratings/types/InputRatingCreate"

export function convertInputData(data: CreateRatingInput): InputRatingCreate {
    return {
        rating_value: data.rating_value,
        scale_minimum: data.scale_minimum,
        scale_maximum: data.scale_maximum,
        scale_direction: data.scale_direction,
    } satisfies InputRatingCreate
}
