import type {CarModelInput} from "../types/CarModelInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: CarModelInput): DbInputData {
    return {
        name: data.name,
        built_from: data.built_from,
        built_to: data.built_to,
        generation: data.generation,
        internal_code: data.internal_code,
        total_production: data.total_production,
    }
}
