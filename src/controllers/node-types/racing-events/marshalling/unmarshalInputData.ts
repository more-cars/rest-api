import {CreateRacingEventRawInput} from "../types/CreateRacingEventRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateRacingEventRawInput {
    return {
        name: data?.name,
        round: data?.round,
        date_from: data?.date_from,
        date_to: data?.date_to,
    } as CreateRacingEventRawInput
}
