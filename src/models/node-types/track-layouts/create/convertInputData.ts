import {CreateTrackLayoutInput} from "../types/CreateTrackLayoutInput"
import {InputTrackLayoutCreate} from "../../../../db/node-types/track-layouts/types/InputTrackLayoutCreate"

export function convertInputData(data: CreateTrackLayoutInput): InputTrackLayoutCreate {
    return {
        name: data.name,
        year_from: data.year_from,
        year_to: data.year_to,
        length: data.length,
        length_unit: data.length_unit,
        direction: data.direction,
        elevation_change: data.elevation_change,
        elevation_change_unit: data.elevation_change_unit,
        surface: data.surface,
    } satisfies InputTrackLayoutCreate
}
