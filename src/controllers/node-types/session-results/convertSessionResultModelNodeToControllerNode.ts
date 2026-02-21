import type {SessionResultNode as ModelSessionResultNode} from "../../../models/node-types/session-results/types/SessionResultNode"
import type {SessionResultNode} from "./types/SessionResultNode"
import {ControllerNodeType} from "../../nodes/types/ControllerNodeType"

export function convertSessionResultModelNodeToControllerNode(modelNode: ModelSessionResultNode): SessionResultNode {
    return {
        node_type: ControllerNodeType.SessionResult,
        fields: {
            id: modelNode.attributes.id,
            position: modelNode.attributes.position,
            race_number: modelNode.attributes.race_number ?? null,
            driver_name: modelNode.attributes.driver_name,
            team_name: modelNode.attributes.team_name ?? null,
            race_time: modelNode.attributes.race_time ?? null,
            laps: modelNode.attributes.laps ?? null,
            status: modelNode.attributes.status ?? null,
            points: modelNode.attributes.points ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies SessionResultNode
}
