import type {DbNode} from "./DbNode"
import type {RelationshipType} from "./RelationshipType"

export type Relationship = {
    id: number
    elementId?: string // TODO this field is only needed temporarily -> can be removed after the big migration
    type: RelationshipType
    start_node: DbNode
    end_node: DbNode
    created_at: string
    updated_at: string
}
