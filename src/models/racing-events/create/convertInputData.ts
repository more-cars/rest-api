import {CreateRacingEventInput} from "../types/CreateRacingEventInput"
import {InputRacingEventCreate} from "../../../db/nodes/racing-events/types/InputRacingEventCreate"

export function convertInputData(data: CreateRacingEventInput): InputRacingEventCreate {
    const convertedData: InputRacingEventCreate = {
        name: data.name,
        round: data.round,
        date_from: data.date_from,
        date_to: data.date_to,
    }

    return convertedData
}
