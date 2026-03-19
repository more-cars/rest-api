import {ControllerNodeType} from "../../../types/ControllerNodeType"

export type PriceNode = {
    node_type: ControllerNodeType.Price
    fields: {
        id: number
        price: number
        currency_code: string
        country_code: string
        created_at: string
        updated_at: string
    }
}
