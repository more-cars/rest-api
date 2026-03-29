import {CreateVideoRawInput} from "../types/CreateVideoRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateVideoRawInput {
    return {
        video_provider: data?.video_provider,
        external_id: data?.external_id,
    } satisfies CreateVideoRawInput
}
