import {CreateCarModelRawInput} from "./types/CreateCarModelRawInput"

/**
 * Picks all attributes from the request object which conform to the API specification.
 * Every other attributes in there will be ignored.
 */
export function unmarshal(data: any): CreateCarModelRawInput {
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
