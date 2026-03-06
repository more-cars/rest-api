import {CreateRatingRawInput} from "../types/CreateRatingRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateRatingRawInput {
    return {
        rating_value: data?.rating_value,
        scale_minimum: data?.scale_minimum,
        scale_maximum: data?.scale_maximum,
        scale_direction: data?.scale_direction,
    } satisfies CreateRatingRawInput
}
