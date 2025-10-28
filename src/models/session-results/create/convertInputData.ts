import {CreateSessionResultInput} from "../types/CreateSessionResultInput"
import {InputSessionResultCreate} from "../../../db/nodes/session-results/types/InputSessionResultCreate"

export function convertInputData(data: CreateSessionResultInput): InputSessionResultCreate {
    const convertedData: InputSessionResultCreate = {
        position: data.position,
        race_number: data.race_number,
        driver_name: data.driver_name,
        team_name: data.team_name,
        race_time: data.race_time,
        laps: data.laps,
        status: data.status,
        points: data.points,
    }

    return convertedData
}
