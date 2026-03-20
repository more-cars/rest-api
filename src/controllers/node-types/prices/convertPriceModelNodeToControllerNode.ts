import type {PriceNode as ModelPriceNode} from "../../../models/node-types/prices/types/PriceNode"
import type {PriceNode} from "./types/PriceNode"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export function convertPriceModelNodeToControllerNode(modelNode: ModelPriceNode): PriceNode {
    return {
        node_type: ControllerNodeType.Price,
        fields: {
            id: modelNode.attributes.id,
            price: modelNode.attributes.price,
            price_year: modelNode.attributes.price_year,
            currency_code: modelNode.attributes.currency_code,
            country_code: modelNode.attributes.country_code,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies PriceNode
}
