import type {RacingSessionNode as ModelRacingSessionNode} from "../../../models/node-types/racing-sessions/types/RacingSessionNode"
import type {RacingSessionNode} from "./types/RacingSessionNode"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export function convertRacingSessionModelNodeToControllerNode(modelNode: ModelRacingSessionNode): RacingSessionNode {
    return {
        node_type: ControllerNodeType.RacingSession,
        fields: {
            id: modelNode.attributes.id,
            name: modelNode.attributes.name,
            start_date: modelNode.attributes.start_date ?? null,
            start_time: modelNode.attributes.start_time ?? null,
            duration: modelNode.attributes.duration ?? null,
            duration_unit: modelNode.attributes.duration_unit ?? null,
            distance: modelNode.attributes.distance ?? null,
            distance_unit: modelNode.attributes.distance_unit ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies RacingSessionNode
}
