import type {ModelNode} from "../../../types/ModelNode"
import type {ModelNodeType} from "../../../types/ModelNodeType"

export interface CompanyNode extends ModelNode {
    node_type: ModelNodeType.Company,
    attributes: {
        id: number

        name: string
        founded: number | null
        defunct: number | null
        headquarters_location: string | null
        legal_headquarters_location: string | null

        created_at: string
        updated_at: string
    }
}
