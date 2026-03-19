import type {ModelCarBrandNode as ModelModelCarBrandNode} from "../../../models/node-types/model-car-brands/types/ModelCarBrandNode"
import type {ModelCarBrandNode} from "./types/ModelCarBrandNode"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export function convertModelCarBrandModelNodeToControllerNode(modelNode: ModelModelCarBrandNode): ModelCarBrandNode {
    return {
        node_type: ControllerNodeType.ModelCarBrand,
        fields: {
            id: modelNode.attributes.id,
            name: modelNode.attributes.name,
            founded: modelNode.attributes.founded ?? null,
            defunct: modelNode.attributes.defunct ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies ModelCarBrandNode
}
