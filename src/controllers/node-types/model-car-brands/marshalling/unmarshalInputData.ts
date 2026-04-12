import {CreateModelCarBrandRawInput} from "../types/CreateModelCarBrandRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateModelCarBrandRawInput {
    return {
        name: data?.name,
        founded: data?.founded,
        defunct: data?.defunct,
        country_code: data?.country_code,
    } satisfies CreateModelCarBrandRawInput
}
