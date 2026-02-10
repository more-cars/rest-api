import {CreateRacingGameRawInput} from "../types/CreateRacingGameRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateRacingGameRawInput {
    return {
        name: data.name,
        release_year: data.release_year,
        developer: data.developer,
        publisher: data.publisher,
    } as CreateRacingGameRawInput
}
