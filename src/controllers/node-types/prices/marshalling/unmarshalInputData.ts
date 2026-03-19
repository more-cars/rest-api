import {CreatePriceRawInput} from "../types/CreatePriceRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreatePriceRawInput {
    return {
        price: data?.price,
        currency_code: data?.currency_code,
        country_code: data?.country_code,
    } satisfies CreatePriceRawInput
}
