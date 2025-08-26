---
to: src/controllers/<%= h.inflection.pluralize(h.changeCase.camel(startNodeType)) %>/marshalling/marshal<%= h.changeCase.pascal(relationshipName) %>Relationship.ts
---
import {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship} from "../../../models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship"
import {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Response} from "../types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Response"

export function marshal<%= h.changeCase.pascal(relationshipName) %>Relationship(relationship: <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship) {
    const marshalledData: <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Response = {
        <%= h.changeCase.snake(startNodeType) %>_id: relationship.<%= h.changeCase.snake(startNodeType) %>_id,
        <%= h.changeCase.snake(endNodeType) %>_id: relationship.<%= h.changeCase.snake(endNodeType) %>_id,
        relationship_id: relationship.relationship_id,
        relationship_name: relationship.relationship_name,
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    }

    return marshalledData
}
