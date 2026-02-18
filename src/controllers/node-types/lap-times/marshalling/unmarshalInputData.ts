import {CreateLapTimeRawInput} from "../types/CreateLapTimeRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateLapTimeRawInput {
    return {
        time: data?.time,
        driver_name: data?.driver_name,
        date: data?.date,
    } as CreateLapTimeRawInput
}
