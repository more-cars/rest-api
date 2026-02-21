import type {TrackLayoutNode as ModelTrackLayoutNodeNode} from "../../../models/node-types/track-layouts/types/TrackLayoutNode"
import type {TrackLayoutNode} from "./types/TrackLayoutNode"
import {ControllerNodeType} from "../../nodes/types/ControllerNodeType"

export function convertTrackLayoutModelNodeToControllerNode(modelNode: ModelTrackLayoutNodeNode): TrackLayoutNode {
    return {
        node_type: ControllerNodeType.TrackLayout,
        fields: {
            id: modelNode.attributes.id,
            name: modelNode.attributes.name,
            year_from: modelNode.attributes.year_from ?? null,
            year_to: modelNode.attributes.year_to ?? null,
            length: modelNode.attributes.length ?? null,
            length_unit: modelNode.attributes.length_unit ?? null,
            direction: modelNode.attributes.direction ?? null,
            elevation_change: modelNode.attributes.elevation_change ?? null,
            elevation_change_unit: modelNode.attributes.elevation_change_unit ?? null,
            surface: modelNode.attributes.surface ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies TrackLayoutNode
}
