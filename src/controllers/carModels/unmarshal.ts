import {CreateCarModelRawInput} from "./types/CreateCarModelRawInput"

/**
 * Picks all attributes from the request object which conform to the API specification.
 * Every other attributes in there will be ignored.
 */
export function unmarshal(body: any): CreateCarModelRawInput {
    const unmarshalledData: CreateCarModelRawInput = {
        name: body.name,
        built_from: body.built_from,
        built_to: body.built_to,
        generation: body.generation,
        internal_code: body.internal_code,
        total_production: body.total_production,
    }

    return unmarshalledData
}
