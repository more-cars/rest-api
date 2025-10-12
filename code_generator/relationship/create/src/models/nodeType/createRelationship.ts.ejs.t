---
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/create<%= h.changeCase.pascal(relationshipName) %>Relationship.ts
---
import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {<%= h.changeCase.pascal(startNodeType) %>Relationship} from "./types/<%= h.changeCase.pascal(startNodeType) %>Relationship"
import {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship} from "./types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship"

export async function create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id: number, <%= h.changeCase.camel(endNodeType) %>Id: number) {
    const dbRelationship = await createRelationship(
        <%= h.changeCase.camel(startNodeType) %>Id,
        <%= h.changeCase.camel(endNodeType) %>Id,
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        <%= h.changeCase.snake(startNodeType) %>_id: <%= h.changeCase.camel(startNodeType) %>Id,
        <%= h.changeCase.snake(endNodeType) %>_id: <%= h.changeCase.camel(endNodeType) %>Id,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: <%= h.changeCase.pascal(startNodeType) %>Relationship.<%= h.changeCase.camel(relationshipName) %>,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    } as <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship
}
