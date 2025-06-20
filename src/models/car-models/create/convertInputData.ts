import {CreateCarModelInput} from "../types/CreateCarModelInput"
import {InputCarModelCreate} from "../../../db/nodes/car-models/types/InputCarModelCreate"

export function convertInputData(data: CreateCarModelInput): InputCarModelCreate {
    const convertedData: InputCarModelCreate = {
        name: data.name,
        built_from: data.built_from,
        built_to: data.built_to,
        generation: data.generation,
        internal_code: data.internal_code,
        total_production: data.total_production,
    }

    return convertedData
}
