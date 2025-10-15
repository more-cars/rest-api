---
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/get<%= h.changeCase.pascal(relationshipName) %>Relationship.ts
---
import {getRelationshipForSpecificNode} from "../../db/relationships/getRelationshipForSpecificNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {<%= h.changeCase.pascal(startNodeType) %>Relationship} from "./types/<%= h.changeCase.pascal(startNodeType) %>Relationship"
import {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship} from "./types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship"

export async function get<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id: number) {
    const dbRelationship = await getRelationshipForSpecificNode(
        <%= h.changeCase.camel(startNodeType) %>Id,
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        <%= h.changeCase.snake(startNodeType) %>_id: dbRelationship.start_node_id,
        <%= h.changeCase.snake(startNodeType === endNodeType ? 'partner' : endNodeType) %>_id: dbRelationship.end_node_id,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: <%= h.changeCase.pascal(startNodeType) %>Relationship.<%= h.changeCase.camel(relationshipName) %>,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at
    } as <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship
}
