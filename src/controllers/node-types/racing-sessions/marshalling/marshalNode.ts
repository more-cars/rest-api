import {RacingSessionNode} from "../../../../models/node-types/racing-sessions/types/RacingSessionNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {RacingSessionResponse} from "../types/RacingSessionResponse"

export function marshalNode(node: RacingSessionNode) {
    return marshalSingleNode({
        id: node.attributes.id,
        name: node.attributes.name,
        start_date: node.attributes.start_date ?? null,
        start_time: node.attributes.start_time ?? null,
        duration: node.attributes.duration ?? null,
        duration_unit: node.attributes.duration_unit ?? null,
        distance: node.attributes.distance ?? null,
        distance_unit: node.attributes.distance_unit ?? null,
        created_at: node.attributes.created_at,
        updated_at: node.attributes.updated_at,
    }) as RacingSessionResponse
}
