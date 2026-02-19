import type {BaseNode} from "./BaseNode"
import type {RelationshipType} from "./RelationshipType"

export type Relationship = {
    id: number
    elementId?: string
    type: RelationshipType
    start_node_id: number
    start_node?: BaseNode
    end_node_id: number
    end_node?: BaseNode
    relationship_name: RelationshipType
    created_at: string
    updated_at: string
}
