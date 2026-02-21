import {TrackLayoutNode as TrackLayoutNodeInput} from "../../../../db/nodes/track-layouts/types/TrackLayoutNode"
import {TrackLayoutNode} from "../types/TrackLayoutNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertTrackLayoutDbNodeToModelNode(data: TrackLayoutNodeInput): TrackLayoutNode {
    return {
        node_type: ModelNodeType.TrackLayout,
        attributes: {
            id: data.properties.id,
            name: data.properties.name,
            year_from: data.properties.year_from,
            year_to: data.properties.year_to,
            length: data.properties.length,
            length_unit: data.properties.length_unit,
            direction: data.properties.direction,
            elevation_change: data.properties.elevation_change,
            elevation_change_unit: data.properties.elevation_change_unit,
            surface: data.properties.surface,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies TrackLayoutNode
}
