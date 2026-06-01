import type {RacingSessionInput} from "../types/RacingSessionInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: RacingSessionInput): DbInputData {
    return {
        name: data.name,
        start_date: data.start_date,
        start_time: data.start_time,
        duration: data.duration,
        distance: data.distance,
        distance_unit: data.distance_unit,
    }
}
