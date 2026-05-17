import type {LapTimeInput} from "../types/LapTimeInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: LapTimeInput): DbInputData {
    return {
        time: data.time,
        driver_name: data.driver_name,
        date: data.date,
    }
}
