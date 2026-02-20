import {TrackLayoutNode} from "../../../../models/node-types/track-layouts/types/TrackLayoutNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {TrackLayoutResponse} from "../types/TrackLayoutResponse"

export function marshalNode(node: TrackLayoutNode) {
    return marshalSingleNode({
        id: node.attributes.id,
        name: node.attributes.name,
        year_from: node.attributes.year_from ?? null,
        year_to: node.attributes.year_to ?? null,
        length: node.attributes.length ?? null,
        length_unit: node.attributes.length_unit ?? null,
        direction: node.attributes.direction ?? null,
        elevation_change: node.attributes.elevation_change ?? null,
        elevation_change_unit: node.attributes.elevation_change_unit ?? null,
        surface: node.attributes.surface ?? null,
        created_at: node.attributes.created_at,
        updated_at: node.attributes.updated_at,
    }) as TrackLayoutResponse
}
