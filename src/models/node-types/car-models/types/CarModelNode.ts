import type {ModelNode} from "../../../types/ModelNode"
import type {ModelNodeType} from "../../../types/ModelNodeType"

export interface CarModelNode extends ModelNode {
    node_type: ModelNodeType.CarModel,
    attributes: {
        id: number

        name: string
        built_from: number | null
        built_to: number | null
        generation: number | null
        internal_code: string | null
        total_production: number | null

        created_at: string
        updated_at: string
    }
}
