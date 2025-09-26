---
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/delete<%= h.changeCase.pascal(relationshipName) %>Relationships.ts
---
import {DbRelationship} from "../../db/types/DbRelationship"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"
import {getRelationshipsForSpecificNode} from "../../db/relationships/getRelationshipsForSpecificNode"

export async function delete<%= h.changeCase.pascal(relationshipName) %>Relationships(<%= h.changeCase.camel(startNodeType) %>Id: number): Promise<void> {
    const relationships = await getRelationshipsForSpecificNode(
        <%= h.changeCase.camel(startNodeType) %>Id,
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
    )

    for (const relationship of relationships) {
        await deleteRelationshipById(relationship.relationship_id)
    }
}
