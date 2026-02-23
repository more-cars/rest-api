import {BrandNode as DbBrandNode} from "../../../../db/node-types/brands/types/BrandNode"
import {BrandNode} from "../types/BrandNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertBrandDbNodeToModelNode(data: DbBrandNode): BrandNode {
    return {
        node_type: ModelNodeType.Brand,
        attributes: {
            id: data.properties.id,
            name: data.properties.name,
            full_name: data.properties.full_name,
            founded: data.properties.founded,
            defunct: data.properties.defunct,
            wmi: data.properties.wmi,
            hsn: data.properties.hsn,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies BrandNode
}
