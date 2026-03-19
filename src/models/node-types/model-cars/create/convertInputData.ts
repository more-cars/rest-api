import {CreateModelCarInput} from "../types/CreateModelCarInput"
import {InputModelCarCreate} from "../../../../db/node-types/model-cars/types/InputModelCarCreate"

export function convertInputData(data: CreateModelCarInput): InputModelCarCreate {
    return {
        name: data.name,
        product_code: data.product_code,
        release_year: data.release_year,
        scale: data.scale,
        series: data.series,
    } satisfies InputModelCarCreate
}
