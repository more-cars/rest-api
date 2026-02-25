import type {RacingEventNode as ModelRacingEventNode} from "../../../models/node-types/racing-events/types/RacingEventNode"
import type {RacingEventNode} from "./types/RacingEventNode"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export function convertRacingEventModelNodeToControllerNode(modelNode: ModelRacingEventNode): RacingEventNode {
    return {
        node_type: ControllerNodeType.RacingEvent,
        fields: {
            id: modelNode.attributes.id,
            name: modelNode.attributes.name,
            round: modelNode.attributes.round ?? null,
            date_from: modelNode.attributes.date_from ?? null,
            date_to: modelNode.attributes.date_to ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies RacingEventNode
}
