---
to: tests/_toolbox/schemas/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Schema.ts
---
export const <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Schema = {
    type: "object",
    properties: {
        <%= h.changeCase.snake(startNodeType) %>_id: {type: "integer"},
        <%= h.changeCase.snake(endNodeType) %>_id: {type: "integer"},
        relationship_id: {type: "integer"},
        relationship_name: {type: "string"},
        created_at: {type: "string"},
        updated_at: {type: "string"},
    },
    required: [
        "<%= h.changeCase.snake(startNodeType) %>_id",
        "<%= h.changeCase.snake(endNodeType) %>_id",
        "relationship_id",
        "relationship_name",
        "created_at",
        "updated_at",
    ],
    additionalProperties: false,
}
