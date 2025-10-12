---
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship.ts
---
import type {BaseNode} from "../../../controllers/nodes/types/BaseNode"

export type <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship = {
    <%= h.changeCase.snake(startNodeType) %>_id: number
    <%= h.changeCase.snake(endNodeType) %>_id: number
    relationship_id: number
    relationship_name: string
    relationship_partner?: BaseNode
    created_at: string
    updated_at: string
}
