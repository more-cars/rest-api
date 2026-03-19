import type {ModelNodeType} from "../../../types/ModelNodeType"

export type ModelCarBrandNode = {
    node_type: ModelNodeType.ModelCarBrand
    attributes: {
        id: number
        name: string
        founded: number | null
        defunct: number | null

        created_at: string
        updated_at: string
    }
}
