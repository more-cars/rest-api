import {CreateImageRawInput} from "./types/CreateImageRawInput"

/**
 * Picks all attributes from the request object which conform to the API specification.
 * Every other attributes in there will be ignored.
 */
export function unmarshal(body: any) {
    const unmarshalledData: CreateImageRawInput = {
        external_id: body.external_id,
        image_provider: body.image_provider,
    }

    return unmarshalledData
}
