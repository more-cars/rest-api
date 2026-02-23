import {CreateRacingEventInput} from "../types/CreateRacingEventInput"
import {InputRacingEventCreate} from "../../../../db/node-types/racing-events/types/InputRacingEventCreate"

export function convertInputData(data: CreateRacingEventInput): InputRacingEventCreate {
    return {
        name: data.name,
        round: data.round,
        date_from: data.date_from,
        date_to: data.date_to,
    } satisfies InputRacingEventCreate
}
