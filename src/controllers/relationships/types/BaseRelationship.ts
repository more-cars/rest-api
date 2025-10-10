import type {BaseNode} from "../../nodes/types/BaseNode"

export type BaseRelationship = {
    relationship_id: number
    relationship_name: string
    relationship_partner: BaseNode
    created_at: string
    updated_at: string
}
