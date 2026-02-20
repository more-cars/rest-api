import {DbNode} from "../../../types/DbNode"
import {DbNodeType} from "../../../types/DbNodeType"

export interface CarModelNode extends DbNode {
    node_type: DbNodeType.CarModel,
    properties: {
        id: number
        created_at: string
        updated_at: string

        name: string
        built_from: number | null
        built_to: number | null
        generation: number | null
        internal_code: string | null
        total_production: number | null
    }
}
