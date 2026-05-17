import type {SessionResultInput} from "../types/SessionResultInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: SessionResultInput): DbInputData {
    return {
        position: data.position,
        race_number: data.race_number,
        driver_name: data.driver_name,
        team_name: data.team_name,
        race_time: data.race_time,
        laps: data.laps,
        status: data.status,
        points: data.points,
    }
}
