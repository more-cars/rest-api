import {CreateTrackLayoutRawInput} from "../types/CreateTrackLayoutRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateTrackLayoutRawInput {
    return {
        name: data?.name,
        year_from: data?.year_from,
        year_to: data?.year_to,
        length: data?.length,
        length_unit: data?.length_unit,
        direction: data?.direction,
        elevation_change: data?.elevation_change,
        elevation_change_unit: data?.elevation_change_unit,
        surface: data?.surface,
    } as CreateTrackLayoutRawInput
}
