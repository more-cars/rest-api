import {CreateImageRawInput} from "../types/CreateImageRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data) {
    return {
        image_provider: data?.image_provider,
        external_id: data?.external_id,
    } satisfies CreateImageRawInput
}
