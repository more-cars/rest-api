import {ModelCarBrandNode as ModelCarBrandNodeInput} from "../../../../db/node-types/model-car-brands/types/ModelCarBrandNode"
import {ModelCarBrandNode} from "../types/ModelCarBrandNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertModelCarBrandDbNodeToModelNode(data: ModelCarBrandNodeInput): ModelCarBrandNode {
    return {
        node_type: ModelNodeType.ModelCarBrand,
        attributes: {
            id: data.properties.id,
            name: data.properties.name,
            founded: data.properties.founded,
            defunct: data.properties.defunct,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies ModelCarBrandNode
}
