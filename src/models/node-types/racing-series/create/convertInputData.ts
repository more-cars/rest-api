import {CreateRacingSeriesInput} from "../types/CreateRacingSeriesInput"
import {InputRacingSeriesCreate} from "../../../../db/node-types/racing-series/types/InputRacingSeriesCreate"

export function convertInputData(data: CreateRacingSeriesInput): InputRacingSeriesCreate {
    return {
        name: data.name,
        short_name: data.short_name,
        founded: data.founded,
        defunct: data.defunct,
        organized_by: data.organized_by,
        vehicle_type: data.vehicle_type,
    } satisfies InputRacingSeriesCreate
}
