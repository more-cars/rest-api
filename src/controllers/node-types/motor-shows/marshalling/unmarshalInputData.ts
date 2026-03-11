import {CreateMotorShowRawInput} from "../types/CreateMotorShowRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateMotorShowRawInput {
    return {
        name: data?.name,
        date_from: data?.date_from,
        date_until: data?.date_until,
        location: data?.location,
        target_audience: data?.target_audience,
        focus: data?.focus,
    } satisfies CreateMotorShowRawInput
}
