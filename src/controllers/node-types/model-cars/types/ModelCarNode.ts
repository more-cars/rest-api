import {ControllerNodeType} from "../../../types/ControllerNodeType"

export type ModelCarNode = {
    node_type: ControllerNodeType.ModelCar
    fields: {
        id: number
        name: string
        product_code: string | null
        release_year: number | null
        scale: string | null
        series: string | null
        created_at: string
        updated_at: string
    }
}
