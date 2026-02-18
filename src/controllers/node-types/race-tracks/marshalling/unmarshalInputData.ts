import {CreateRaceTrackRawInput} from "../types/CreateRaceTrackRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateRaceTrackRawInput {
    return {
        name: data?.name,
        opened: data?.opened,
        closed: data?.closed,
        type: data?.type,
        location: data?.location,
        geo_position: data?.geo_position,
    } as CreateRaceTrackRawInput
}
