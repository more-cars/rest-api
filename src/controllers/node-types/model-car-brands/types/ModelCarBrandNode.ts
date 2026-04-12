import {ControllerNodeType} from "../../../types/ControllerNodeType"

export type ModelCarBrandNode = {
    node_type: ControllerNodeType.ModelCarBrand
    fields: {
        id: number
        name: string
        founded: number | null
        defunct: number | null
        country_code: string | null
        created_at: string
        updated_at: string
    }
}
