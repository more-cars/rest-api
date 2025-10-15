---
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/delete<%= h.changeCase.pascal(relationshipName) %>Relationship.ts
---
import {deleteSpecificRelationship} from "../../db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"

export async function delete<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id: number, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id: number) {
    return deleteSpecificRelationship(
        <%= h.changeCase.camel(startNodeType) %>Id,
        <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id,
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
    )
}
