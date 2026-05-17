import type {RacingSeriesInput} from "../types/RacingSeriesInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: RacingSeriesInput): DbInputData {
    return {
        name: data.name,
        short_name: data.short_name,
        founded: data.founded,
        defunct: data.defunct,
        organized_by: data.organized_by,
        vehicle_type: data.vehicle_type,
        country_code: data.country_code,
    }
}
