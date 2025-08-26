---
to: src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/create<%= h.changeCase.pascal(relationshipName) %>Relationship.ts
---
import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship} from "./types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship"
import {<%= h.changeCase.pascal(startNodeType) %>Relationship} from "./types/<%= h.changeCase.pascal(startNodeType) %>Relationship"

export async function create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id: number, <%= h.changeCase.camel(endNodeType) %>Id: number): Promise<false | <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship> {
    const baseRelationship = await createRelationship(
        <%= h.changeCase.camel(startNodeType) %>Id,
        <%= h.changeCase.camel(endNodeType) %>Id,
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
    )

    if (!baseRelationship) {
        return false
    }

    const specificRelationship: <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship = {
        <%= h.changeCase.snake(startNodeType) %>_id: <%= h.changeCase.camel(startNodeType) %>Id,
        <%= h.changeCase.snake(endNodeType) %>_id: <%= h.changeCase.camel(endNodeType) %>Id,
        relationship_id: baseRelationship.relationship_id,
        relationship_name: <%= h.changeCase.pascal(startNodeType) %>Relationship.<%= h.changeCase.camel(relationshipName) %>,
        created_at: baseRelationship.created_at,
        updated_at: baseRelationship.updated_at,
    }

    return specificRelationship
}
