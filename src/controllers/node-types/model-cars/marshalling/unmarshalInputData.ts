import {CreateModelCarRawInput} from "../types/CreateModelCarRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateModelCarRawInput {
    return {
        name: data?.name,
        product_code: data?.product_code,
        release_year: data?.release_year,
        scale: data?.scale,
        series: data?.series,
    } satisfies CreateModelCarRawInput
}
