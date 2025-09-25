---
to: src/controllers/<%= h.changeCase.camel(h.inflection.pluralize(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Response.ts
---
export type <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Response = {
    <%= h.changeCase.snake(startNodeType) %>_id: number
    <%= h.changeCase.snake(endNodeType) %>_id: number
    relationship_id: number
    relationship_name: string
    created_at: string
    updated_at: string
}
