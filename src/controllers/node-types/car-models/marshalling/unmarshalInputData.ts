import {CreateCarModelRawInput} from "../types/CreateCarModelRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateCarModelRawInput {
    return {
        name: data?.name,
        built_from: data?.built_from,
        built_to: data?.built_to,
        generation: data?.generation,
        internal_code: data?.internal_code,
        total_production: data?.total_production,
    } satisfies CreateCarModelRawInput
}
