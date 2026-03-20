import {PriceNode as PriceNodeInput} from "../../../../db/node-types/prices/types/PriceNode"
import {PriceNode} from "../types/PriceNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertPriceDbNodeToModelNode(data: PriceNodeInput): PriceNode {
    return {
        node_type: ModelNodeType.Price,
        attributes: {
            id: data.properties.id,
            price: data.properties.price,
            price_year: data.properties.price_year,
            currency_code: data.properties.currency_code,
            country_code: data.properties.country_code,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies PriceNode
}
