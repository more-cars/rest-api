---
to: src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship.ts
---
export type <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship = {
    <%= h.changeCase.snake(startNodeType) %>_id: number
    <%= h.changeCase.snake(endNodeType) %>_id: number
    relationship_id: number
    relationship_name: string
    created_at: string
    updated_at: string
}
