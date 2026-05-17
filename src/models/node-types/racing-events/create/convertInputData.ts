import type {RacingEventInput} from "../types/RacingEventInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: RacingEventInput): DbInputData {
    return {
        name: data.name,
        round: data.round,
        date_from: data.date_from,
        date_to: data.date_to,
    }
}
