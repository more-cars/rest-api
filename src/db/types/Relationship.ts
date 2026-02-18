import type {BaseNode} from "./BaseNode"

export type Relationship = {
    id?: number
    elementId?: string
    type?: string
    start_node_id: number
    start_node?: BaseNode
    end_node_id: number
    end_node?: BaseNode
    relationship_id: number
    relationship_name: string
    created_at: string
    updated_at: string
}
