import {RacingEventNode} from "../../../models/racing-events/types/RacingEventNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {RacingEventResponse} from "../types/RacingEventResponse"

export function marshalNode(node: RacingEventNode) {
    return marshalSingleNode({
        id: node.id,
        name: node.name,
        round: node.round ?? null,
        date_from: node.date_from ?? null,
        date_to: node.date_to ?? null,
        created_at: node.created_at,
        updated_at: node.updated_at,
    }) as RacingEventResponse
}
