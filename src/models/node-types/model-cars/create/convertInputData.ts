import type {ModelCarInput} from "../types/ModelCarInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: ModelCarInput): DbInputData {
    return {
        name: data.name,
        product_code: data.product_code,
        release_year: data.release_year,
        scale: data.scale,
        series: data.series,
    }
}
