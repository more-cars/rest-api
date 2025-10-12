---
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/delete<%= h.changeCase.pascal(relationshipName) %>Relationships.ts
---
import {getRelationshipForSpecificNode} from "../../db/relationships/getRelationshipForSpecificNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"

export async function deleteForeign<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(endNodeType) %>Id: number) {
    const relationship = await getRelationshipForSpecificNode(
        <%= h.changeCase.camel(endNodeType) %>Id,
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
    )

    if (relationship) {
        await deleteRelationshipById(relationship.relationship_id)
    }
}
