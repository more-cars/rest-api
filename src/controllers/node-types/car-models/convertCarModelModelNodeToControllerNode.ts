import type {CarModelNode as ModelCarModelNode} from "../../../models/node-types/car-models/types/CarModelNode"
import type {CarModelNode} from "./types/CarModelNode"
import {ControllerNodeType} from "../../nodes/types/ControllerNodeType"

export function convertCarModelModelNodeToControllerNode(modelNode: ModelCarModelNode): CarModelNode {
    return {
        node_type: ControllerNodeType.CarModel,
        fields: {
            id: modelNode.attributes.id,
            name: modelNode.attributes.name,
            built_from: modelNode.attributes.built_from ?? null,
            built_to: modelNode.attributes.built_to ?? null,
            generation: modelNode.attributes.generation ?? null,
            internal_code: modelNode.attributes.internal_code ?? null,
            total_production: modelNode.attributes.total_production ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies CarModelNode
}
