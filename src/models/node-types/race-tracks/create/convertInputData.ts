import {CreateRaceTrackInput} from "../types/CreateRaceTrackInput"
import {InputRaceTrackCreate} from "../../../../db/nodes/race-tracks/types/InputRaceTrackCreate"

export function convertInputData(data: CreateRaceTrackInput): InputRaceTrackCreate {
    const convertedData: InputRaceTrackCreate = {
        name: data.name,
        opened: data.opened,
        closed: data.closed,
        type: data.type,
        location: data.location,
        geo_position: data.geo_position,
    }

    return convertedData
}
