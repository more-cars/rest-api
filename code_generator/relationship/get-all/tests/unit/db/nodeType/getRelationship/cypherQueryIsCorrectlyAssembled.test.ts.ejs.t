---
to: tests/unit/db/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/getAll<%= h.changeCase.pascal(relationshipName) %>Relationships/cypherQueryIsCorrectlyAssembled.test.ts
---
import {expect, test} from 'vitest'
import {getRelationshipsForSpecificNodeQuery} from "../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('assembled database query for fetching all ›<%= h.changeCase.kebab(relationshipName) %>‹ relationships', async () => {
    const query = getRelationshipsForSpecificNodeQuery(
        12002002, // <%= h.changeCase.title(startNodeType) %>
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:<%= h.changeCase.upper(h.changeCase.snake(relationshipName)) %>]-(b)\n" +
            "RETURN r, b")
})
