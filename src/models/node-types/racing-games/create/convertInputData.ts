import type {RacingGameInput} from "../types/RacingGameInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: RacingGameInput): DbInputData {
    return {
        name: data.name,
        release_year: data.release_year,
        developer: data.developer,
        publisher: data.publisher,
    }
}
