import type {BaseNode} from "../../../controllers/nodes/types/BaseNode"

export type GenericRelationship = {
    start_node_id: number
    end_node_id: number
    relationship_id: number
    relationship_name: string
    relationship_partner: BaseNode
    created_at: string
    updated_at: string
}
