---
to: tests/unit/db/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/delete<%= h.changeCase.pascal(relationshipName) %>Relationship/cypherQueryIsCorrectlyAssembled.test.ts
---
import {expect, test} from 'vitest'
import {deleteSpecificRelationshipQuery} from "../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('assembled database query for deleting ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', async () => {
    const query = deleteSpecificRelationshipQuery(
        12002002, // <%= h.changeCase.title(startNodeType) %>
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        12002003, // <%= h.changeCase.title(endNodeType) %>
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:<%= h.changeCase.upper(h.changeCase.snake(relationshipName)) %>]-(b {mc_id: 12002003})\n" +
            "DELETE r")
})
