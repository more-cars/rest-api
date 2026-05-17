import type {GamingPlatformInput} from "../types/GamingPlatformInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: GamingPlatformInput): DbInputData {
    return {
        name: data.name,
        release_year: data.release_year,
        manufacturer: data.manufacturer,
    }
}
