---
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/get<%= h.changeCase.pascal(relationshipName) %>Relationship.ts
---
import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {<%= h.changeCase.pascal(startNodeType) %>Relationship} from "./types/<%= h.changeCase.pascal(startNodeType) %>Relationship"
import {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship} from "./types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship"

export async function get<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id: number, <%= h.changeCase.camel(endNodeType) %>Id: number): Promise<false | <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship> {
    const baseRelationship = await getSpecificRelationship(
        <%= h.changeCase.camel(startNodeType) %>Id,
        <%= h.changeCase.camel(endNodeType) %>Id,
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
    )

    if (!baseRelationship) {
        return false
    }

    return {
        <%= h.changeCase.snake(startNodeType) %>_id: <%= h.changeCase.camel(startNodeType) %>Id,
        <%= h.changeCase.snake(endNodeType) %>_id: <%= h.changeCase.camel(endNodeType) %>Id,
        relationship_id: baseRelationship.relationship_id,
        relationship_name: <%= h.changeCase.pascal(startNodeType) %>Relationship.<%= h.changeCase.camel(relationshipName) %>,
        created_at: baseRelationship.created_at,
        updated_at: baseRelationship.updated_at,
    } as <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship
}
