import {RaceTrackNode} from "../../../../models/node-types/race-tracks/types/RaceTrackNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {RaceTrackResponse} from "../types/RaceTrackResponse"

export function marshalNode(node: RaceTrackNode) {
    return marshalSingleNode({
        id: node.attributes.id,
        name: node.attributes.name,
        opened: node.attributes.opened ?? null,
        closed: node.attributes.closed ?? null,
        type: node.attributes.type ?? null,
        location: node.attributes.location ?? null,
        geo_position: node.attributes.geo_position ?? null,
        created_at: node.attributes.created_at,
        updated_at: node.attributes.updated_at,
    }) as RaceTrackResponse
}
