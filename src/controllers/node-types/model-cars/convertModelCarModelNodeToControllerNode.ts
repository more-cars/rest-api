import type {ModelCarNode as ModelModelCarNode} from "../../../models/node-types/model-cars/types/ModelCarNode"
import type {ModelCarNode} from "./types/ModelCarNode"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export function convertModelCarModelNodeToControllerNode(modelNode: ModelModelCarNode): ModelCarNode {
    return {
        node_type: ControllerNodeType.ModelCar,
        fields: {
            id: modelNode.attributes.id,
            name: modelNode.attributes.name,
            product_code: modelNode.attributes.product_code ?? null,
            release_year: modelNode.attributes.release_year ?? null,
            scale: modelNode.attributes.scale ?? null,
            series: modelNode.attributes.series ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies ModelCarNode
}
