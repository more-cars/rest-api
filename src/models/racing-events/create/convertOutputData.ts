import {RacingEventNode as RacingEventNodeInput} from "../../../db/nodes/racing-events/types/RacingEventNode"
import {RacingEventNode} from "../types/RacingEventNode"

export function convertOutputData(data: RacingEventNodeInput): RacingEventNode {
    return {
        id: data.id,
        name: data.name,
        round: data.round,
        date_from: data.date_from,
        date_to: data.date_to,
        created_at: data.created_at,
        updated_at: data.updated_at,
    } as RacingEventNode
}
