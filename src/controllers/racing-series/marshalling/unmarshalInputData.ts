import {CreateRacingSeriesRawInput} from "../types/CreateRacingSeriesRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateRacingSeriesRawInput {
    return {
        name: data?.name,
        short_name: data?.short_name,
        founded: data?.founded,
        defunct: data?.defunct,
        organized_by: data?.organized_by,
        vehicle_type: data?.vehicle_type,
    } as CreateRacingSeriesRawInput
}
