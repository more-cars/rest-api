import type {MotorShowNode as ModelMotorShowNode} from "../../../models/node-types/motor-shows/types/MotorShowNode"
import type {MotorShowNode} from "./types/MotorShowNode"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export function convertMotorShowModelNodeToControllerNode(modelNode: ModelMotorShowNode): MotorShowNode {
    return {
        node_type: ControllerNodeType.MotorShow,
        fields: {
            id: modelNode.attributes.id,
            name: modelNode.attributes.name,
            date_from: modelNode.attributes.date_from ?? null,
            date_until: modelNode.attributes.date_until ?? null,
            location: modelNode.attributes.location ?? null,
            target_audience: modelNode.attributes.target_audience ?? null,
            focus: modelNode.attributes.focus ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies MotorShowNode
}
