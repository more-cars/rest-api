import type {BaseNode} from "../../../controllers/nodes/types/BaseNode"

export type CompanyHasImageRelationship = {
    company_id: number
    image_id: number
    relationship_id: number
    relationship_name: string
    relationship_partner?: BaseNode
    created_at: string
    updated_at: string
}
