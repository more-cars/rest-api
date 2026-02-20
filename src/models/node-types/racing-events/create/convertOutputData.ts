import {RacingEventNode as RacingEventNodeInput} from "../../../../db/nodes/racing-events/types/RacingEventNode"
import {RacingEventNode} from "../types/RacingEventNode"

export function convertOutputData(data: RacingEventNodeInput): RacingEventNode {
    return {
        id: data.properties.id,
        name: data.properties.name,
        round: data.properties.round,
        date_from: data.properties.date_from,
        date_to: data.properties.date_to,
        created_at: data.properties.created_at,
        updated_at: data.properties.updated_at,
    } as RacingEventNode
}
