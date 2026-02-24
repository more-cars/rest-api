import {CreateGamingPlatformRawInput} from "../types/CreateGamingPlatformRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateGamingPlatformRawInput {
    return {
        name: data?.name,
        release_year: data?.release_year,
        manufacturer: data?.manufacturer,
    } satisfies CreateGamingPlatformRawInput
}
