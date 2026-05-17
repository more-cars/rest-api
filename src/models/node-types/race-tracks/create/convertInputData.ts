import type {RaceTrackInput} from "../types/RaceTrackInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: RaceTrackInput): DbInputData {
    return {
        name: data.name,
        opened: data.opened,
        closed: data.closed,
        type: data.type,
        location: data.location,
        geo_position: data.geo_position,
        country_code: data.country_code,
    }
}
