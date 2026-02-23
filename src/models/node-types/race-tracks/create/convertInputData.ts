import {CreateRaceTrackInput} from "../types/CreateRaceTrackInput"
import {InputRaceTrackCreate} from "../../../../db/node-types/race-tracks/types/InputRaceTrackCreate"

export function convertInputData(data: CreateRaceTrackInput): InputRaceTrackCreate {
    return {
        name: data.name,
        opened: data.opened,
        closed: data.closed,
        type: data.type,
        location: data.location,
        geo_position: data.geo_position,
    } satisfies InputRaceTrackCreate
}
