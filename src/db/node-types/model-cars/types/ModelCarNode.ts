import {DbNodeType} from "../../../types/DbNodeType"

export type ModelCarNode = {
    node_type: DbNodeType.ModelCar,
    properties: {
        id: number
        created_at: string
        updated_at: string
        name: string
        product_code: string | null
        release_year: number | null
        scale: string | null
        series: string | null
    }
}
