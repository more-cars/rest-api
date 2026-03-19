import type {ModelNodeType} from "../../../types/ModelNodeType"

export type PriceNode = {
    node_type: ModelNodeType.Price
    attributes: {
        id: number
        price: number
        currency_code: string
        country_code: string

        created_at: string
        updated_at: string
    }
}
