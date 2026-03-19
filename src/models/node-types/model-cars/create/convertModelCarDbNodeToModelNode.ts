import {ModelCarNode as ModelCarNodeInput} from "../../../../db/node-types/model-cars/types/ModelCarNode"
import {ModelCarNode} from "../types/ModelCarNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertModelCarDbNodeToModelNode(data: ModelCarNodeInput): ModelCarNode {
    return {
        node_type: ModelNodeType.ModelCar,
        attributes: {
            id: data.properties.id,
            name: data.properties.name,
            product_code: data.properties.product_code,
            release_year: data.properties.release_year,
            scale: data.properties.scale,
            series: data.properties.series,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies ModelCarNode
}
