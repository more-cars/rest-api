import type {ModelNode} from "../../../types/ModelNode"
import type {ModelNodeType} from "../../../types/ModelNodeType"

export interface BrandNode extends ModelNode {
    node_type: ModelNodeType.Brand,
    attributes: {
        id: number

        name: string
        full_name: string | null
        founded: number | null
        defunct: number | null
        wmi: string | null
        hsn: string | null

        created_at: string
        updated_at: string
    }
}
