import {CreateRacingSessionRawInput} from "../types/CreateRacingSessionRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateRacingSessionRawInput {
    return {
        name: data.name,
        start_date: data.start_date,
        start_time: data.start_time,
        duration: data.duration,
        duration_unit: data.duration_unit,
        distance: data.distance,
        distance_unit: data.distance_unit,
    } as CreateRacingSessionRawInput
}
