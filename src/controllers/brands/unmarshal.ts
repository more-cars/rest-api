import {CreateBrandRawInput} from "./types/CreateBrandRawInput"

/**
 * This picks all attributes from the data object which are expected according to the API specification.
 * Everything else in there will be ignored.
 * The type hints are only there to help constructing the correct STRUCTURE.
 * The DATA itself is NOT validated here (and also not sanitized).
 */
// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshal(data): CreateBrandRawInput {
    const unmarshalledData: CreateBrandRawInput = {
        name: data.name,
        full_name: data.full_name,
        founded: data.founded,
        defunct: data.defunct,
        wmi: data.wmi,
        hsn: data.hsn,
    }

    return unmarshalledData
}
