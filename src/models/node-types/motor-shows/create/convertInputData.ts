import type {MotorShowInput} from "../types/MotorShowInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: MotorShowInput): DbInputData {
    return {
        name: data.name,
        date_from: data.date_from,
        date_until: data.date_until,
        location: data.location,
        target_audience: data.target_audience,
        focus: data.focus,
        country_code: data.country_code,
    }
}
