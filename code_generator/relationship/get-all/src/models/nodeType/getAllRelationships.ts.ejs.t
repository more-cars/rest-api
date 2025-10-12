---
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/getAll<%= h.changeCase.pascal(relationshipName) %>Relationships.ts
---
import {getRelationshipsForSpecificNode} from "../../db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship} from "./types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship"
import {<%= h.changeCase.pascal(startNodeType) %>Relationship} from "./types/<%= h.changeCase.pascal(startNodeType) %>Relationship"

export async function getAll<%= h.changeCase.pascal(relationshipName) %>Relationships(<%= h.changeCase.camel(startNodeType) %>Id: number) {
    const dbRelationships = await getRelationshipsForSpecificNode(
        <%= h.changeCase.camel(startNodeType) %>Id,
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
    )

    const mappedRelationships: <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship[] = []

    dbRelationships.forEach(dbRelationship => {
        mappedRelationships.push({
            <%= h.changeCase.snake(startNodeType) %>_id: dbRelationship.start_node_id,
            <%= h.changeCase.snake(endNodeType) %>_id: dbRelationship.end_node_id,
            relationship_id: dbRelationship.relationship_id,
            relationship_name: <%= h.changeCase.pascal(startNodeType) %>Relationship.<%= h.changeCase.camel(relationshipName) %>,
            created_at: dbRelationship.created_at,
            updated_at: dbRelationship.updated_at
        } as <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship)
    })

    return mappedRelationships
}
