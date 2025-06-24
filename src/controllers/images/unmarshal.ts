import {CreateImageRawInput} from "./types/CreateImageRawInput"

/**
 * Picks all attributes from the request object which conform to the API specification.
 * Every other attributes in there will be ignored.
 */
// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshal(data) {
    const unmarshalledData: CreateImageRawInput = {
        external_id: data.external_id,
        image_provider: data.image_provider,
    }

    return unmarshalledData
}
