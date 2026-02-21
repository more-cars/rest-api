import {CreateRacingGameInput} from "../types/CreateRacingGameInput"
import {InputRacingGameCreate} from "../../../../db/nodes/racing-games/types/InputRacingGameCreate"

export function convertInputData(data: CreateRacingGameInput): InputRacingGameCreate {
    return {
        name: data.name,
        release_year: data.release_year,
        developer: data.developer,
        publisher: data.publisher,
    } satisfies InputRacingGameCreate
}
