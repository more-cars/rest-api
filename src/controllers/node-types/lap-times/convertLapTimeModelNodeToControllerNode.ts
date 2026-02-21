import type {LapTimeNode as ModelLapTimeNode} from "../../../models/node-types/lap-times/types/LapTimeNode"
import type {LapTimeNode} from "./types/LapTimeNode"
import {ControllerNodeType} from "../../nodes/types/ControllerNodeType"

export function convertLapTimeModelNodeToControllerNode(modelNode: ModelLapTimeNode): LapTimeNode {
    return {
        node_type: ControllerNodeType.LapTime,
        fields: {
            id: modelNode.attributes.id,
            time: modelNode.attributes.time,
            driver_name: modelNode.attributes.driver_name,
            date: modelNode.attributes.date ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies LapTimeNode
}
