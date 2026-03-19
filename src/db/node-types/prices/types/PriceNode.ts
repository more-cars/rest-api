import {DbNodeType} from "../../../types/DbNodeType"

export type PriceNode = {
    node_type: DbNodeType.Price,
    properties: {
        id: number
        created_at: string
        updated_at: string
        price: number
        currency_code: string
        country_code: string
    }
}
