import type {BaseNode} from "./BaseNode"
import type {RelationshipType} from "./RelationshipType"

export type Relationship = {
    id: number
    elementId?: string
    type: RelationshipType
    start_node: BaseNode
    end_node: BaseNode
    created_at: string
    updated_at: string
}
