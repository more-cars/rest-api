import {CreateRacingSessionInput} from "../types/CreateRacingSessionInput"
import {InputRacingSessionCreate} from "../../../../db/node-types/racing-sessions/types/InputRacingSessionCreate"

export function convertInputData(data: CreateRacingSessionInput): InputRacingSessionCreate {
    return {
        name: data.name,
        start_date: data.start_date,
        start_time: data.start_time,
        duration: data.duration,
        duration_unit: data.duration_unit,
        distance: data.distance,
        distance_unit: data.distance_unit,
    } satisfies InputRacingSessionCreate
}
