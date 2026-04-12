import {DbNodeType} from "../../../types/DbNodeType"

export type ModelCarBrandNode = {
    node_type: DbNodeType.ModelCarBrand,
    properties: {
        id: number
        created_at: string
        updated_at: string
        name: string
        founded: number | null
        defunct: number | null
        country_code: string | null
    }
}
