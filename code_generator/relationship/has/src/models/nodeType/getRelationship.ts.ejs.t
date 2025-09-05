---
to: src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/has<%= h.changeCase.pascal(relationshipName) %>Relationship.ts
---
import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship} from "./types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship"
import {<%= h.changeCase.pascal(startNodeType) %>Relationship} from "./types/<%= h.changeCase.pascal(startNodeType) %>Relationship"

export async function has<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id: number, <%= h.changeCase.camel(endNodeType) %>Id: number): Promise<false | <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship> {
    const dbRelationship = await getSpecificRelationship(
        <%= h.changeCase.camel(startNodeType) %>Id,
        <%= h.changeCase.camel(endNodeType) %>Id,
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        <%= h.changeCase.snake(startNodeType) %>_id: dbRelationship.start_node_id,
        <%= h.changeCase.snake(endNodeType) %>_id: dbRelationship.end_node_id,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: <%= h.changeCase.pascal(startNodeType) %>Relationship.<%= h.changeCase.camel(relationshipName) %>,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at
    } as <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship
}
