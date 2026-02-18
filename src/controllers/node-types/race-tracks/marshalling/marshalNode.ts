import {RaceTrackNode} from "../../../../models/node-types/race-tracks/types/RaceTrackNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {RaceTrackResponse} from "../types/RaceTrackResponse"

export function marshalNode(node: RaceTrackNode) {
    return marshalSingleNode({
        id: node.id,
        name: node.name,
        opened: node.opened ?? null,
        closed: node.closed ?? null,
        type: node.type ?? null,
        location: node.location ?? null,
        geo_position: node.geo_position ?? null,
        created_at: node.created_at,
        updated_at: node.updated_at,
    }) as RaceTrackResponse
}
