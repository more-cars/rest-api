import {RacingSessionNode as RacingSessionNodeInput} from "../../../../db/nodes/racing-sessions/types/RacingSessionNode"
import {RacingSessionNode} from "../types/RacingSessionNode"

export function convertOutputData(data: RacingSessionNodeInput): RacingSessionNode {
    return {
        id: data.id,
        name: data.name,
        start_date: data.start_date,
        start_time: data.start_time,
        duration: data.duration,
        duration_unit: data.duration_unit,
        distance: data.distance,
        distance_unit: data.distance_unit,
        created_at: data.created_at,
        updated_at: data.updated_at,
    } as RacingSessionNode
}
