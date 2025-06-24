import {CreateCarModelRawInput} from "./types/CreateCarModelRawInput"

/**
 * Picks all attributes from the request object which conform to the API specification.
 * Every other attributes in there will be ignored.
 */
// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshal(data): CreateCarModelRawInput {
    const unmarshalledData: CreateCarModelRawInput = {
        name: data.name,
        built_from: data.built_from,
        built_to: data.built_to,
        generation: data.generation,
        internal_code: data.internal_code,
        total_production: data.total_production,
    }

    return unmarshalledData
}
