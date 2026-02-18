import {RacingSessionNode} from "../../../../models/node-types/racing-sessions/types/RacingSessionNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {RacingSessionResponse} from "../types/RacingSessionResponse"

export function marshalNode(node: RacingSessionNode) {
    return marshalSingleNode({
        id: node.id,
        name: node.name,
        start_date: node.start_date ?? null,
        start_time: node.start_time ?? null,
        duration: node.duration ?? null,
        duration_unit: node.duration_unit ?? null,
        distance: node.distance ?? null,
        distance_unit: node.distance_unit ?? null,
        created_at: node.created_at,
        updated_at: node.updated_at,
    }) as RacingSessionResponse
}
