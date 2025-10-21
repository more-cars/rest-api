import {TrackLayoutNode as TrackLayoutNodeInput} from "../../../db/nodes/track-layouts/types/TrackLayoutNode"
import {TrackLayoutNode} from "../types/TrackLayoutNode"

export function convertOutputData(data: TrackLayoutNodeInput): TrackLayoutNode {
    return {
        id: data.id,
        name: data.name,
        year_from: data.year_from,
        year_to: data.year_to,
        length: data.length,
        length_unit: data.length_unit,
        direction: data.direction,
        elevation_change: data.elevation_change,
        elevation_change_unit: data.elevation_change_unit,
        surface: data.surface,
        created_at: data.created_at,
        updated_at: data.updated_at,
    } as TrackLayoutNode
}
