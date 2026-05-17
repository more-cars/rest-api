import type {ModelCarBrandInput} from "../types/ModelCarBrandInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: ModelCarBrandInput): DbInputData {
    return {
        name: data.name,
        founded: data.founded,
        defunct: data.defunct,
        country_code: data.country_code,
    }
}
