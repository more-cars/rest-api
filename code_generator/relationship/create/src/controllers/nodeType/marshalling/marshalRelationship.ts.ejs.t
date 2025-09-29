---
to: src/controllers/<%= h.changeCase.camel(h.inflection.pluralize(startNodeType)) %>/marshalling/marshal<%= h.changeCase.pascal(relationshipName) %>Relationship.ts
---
import {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship} from "../../../models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship"
import {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Response} from "../types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Response"
import {dasherize} from "inflection"

export function marshal<%= h.changeCase.pascal(relationshipName) %>Relationship(relationship: <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship) {
    return {
        <%= h.changeCase.snake(startNodeType) %>_id: relationship.<%= h.changeCase.snake(startNodeType) %>_id,
        <%= h.changeCase.snake(endNodeType) %>_id: relationship.<%= h.changeCase.snake(endNodeType) %>_id,
        relationship_id: relationship.relationship_id,
        relationship_name: dasherize(relationship.relationship_name.toLowerCase()),
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    } as <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Response
}
