import type {BrandNode as ModelBrandNode} from "../../../models/node-types/brands/types/BrandNode"
import type {BrandNode} from "./types/BrandNode"
import {ControllerNodeType} from "../../nodes/types/ControllerNodeType"

export function convertBrandModelNodeToControllerNode(modelNode: ModelBrandNode): BrandNode {
    return {
        node_type: ControllerNodeType.Brand,
        fields: {
            id: modelNode.attributes.id,
            name: modelNode.attributes.name,
            full_name: modelNode.attributes.full_name ?? null,
            founded: modelNode.attributes.founded ?? null,
            defunct: modelNode.attributes.defunct ?? null,
            wmi: modelNode.attributes.wmi ?? null,
            hsn: modelNode.attributes.hsn ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies BrandNode
}
