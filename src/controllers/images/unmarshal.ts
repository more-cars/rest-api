import {CreateImageRawInput} from "./types/CreateImageRawInput"

/**
 * Picks all attributes from the request object which conform to the API specification.
 * Every other attributes in there will be ignored.
 */
export function unmarshal(data: any) {
    const unmarshalledData: CreateImageRawInput = {
        external_id: data.external_id,
        image_provider: data.image_provider,
    }

    return unmarshalledData
}
