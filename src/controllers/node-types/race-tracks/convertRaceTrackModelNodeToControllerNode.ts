import type {RaceTrackNode as ModelRaceTrackNode} from "../../../models/node-types/race-tracks/types/RaceTrackNode"
import type {RaceTrackNode} from "./types/RaceTrackNode"
import {ControllerNodeType} from "../../nodes/types/ControllerNodeType"

export function convertRaceTrackModelNodeToControllerNode(modelNode: ModelRaceTrackNode): RaceTrackNode {
    return {
        node_type: ControllerNodeType.RaceTrack,
        fields: {
            id: modelNode.attributes.id,
            name: modelNode.attributes.name,
            opened: modelNode.attributes.opened ?? null,
            closed: modelNode.attributes.closed ?? null,
            type: modelNode.attributes.type ?? null,
            location: modelNode.attributes.location ?? null,
            geo_position: modelNode.attributes.geo_position ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies RaceTrackNode
}
