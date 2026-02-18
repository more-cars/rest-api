import {TrackLayoutNode} from "../../../../models/node-types/track-layouts/types/TrackLayoutNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {TrackLayoutResponse} from "../types/TrackLayoutResponse"

export function marshalNode(node: TrackLayoutNode) {
    return marshalSingleNode({
        id: node.id,
        name: node.name,
        year_from: node.year_from ?? null,
        year_to: node.year_to ?? null,
        length: node.length ?? null,
        length_unit: node.length_unit ?? null,
        direction: node.direction ?? null,
        elevation_change: node.elevation_change ?? null,
        elevation_change_unit: node.elevation_change_unit ?? null,
        surface: node.surface ?? null,
        created_at: node.created_at,
        updated_at: node.updated_at,
    }) as TrackLayoutResponse
}
