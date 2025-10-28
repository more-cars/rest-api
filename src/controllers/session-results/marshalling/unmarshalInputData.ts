import {CreateSessionResultRawInput} from "../types/CreateSessionResultRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateSessionResultRawInput {
    return {
        position: data.position,
        race_number: data.race_number,
        driver_name: data.driver_name,
        team_name: data.team_name,
        race_time: data.race_time,
        laps: data.laps,
        status: data.status,
        points: data.points,
    } as CreateSessionResultRawInput
}
