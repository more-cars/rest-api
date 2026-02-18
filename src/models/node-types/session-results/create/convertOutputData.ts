import {SessionResultNode as SessionResultNodeInput} from "../../../../db/nodes/session-results/types/SessionResultNode"
import {SessionResultNode} from "../types/SessionResultNode"

export function convertOutputData(data: SessionResultNodeInput): SessionResultNode {
    return {
        id: data.id,
        position: data.position,
        race_number: data.race_number,
        driver_name: data.driver_name,
        team_name: data.team_name,
        race_time: data.race_time,
        laps: data.laps,
        status: data.status,
        points: data.points,
        created_at: data.created_at,
        updated_at: data.updated_at,
    } as SessionResultNode
}
