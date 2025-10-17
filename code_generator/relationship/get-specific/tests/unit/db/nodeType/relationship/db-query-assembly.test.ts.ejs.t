---
to: tests/unit/db/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.kebab(relationshipName) %>/get-specific/db-query-assembly.test.ts
---
import {expect, test} from 'vitest'
import {getSpecificRelationshipQuery} from "../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../src/db/types/DbRelationship"

test('assembled database query for fetching specific ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', async () => {
    const query = getSpecificRelationshipQuery(
        12002002, // <%= h.changeCase.title(startNodeType) %>
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        12002003, // <%= h.changeCase.title(endNodeType) %>
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:<%= h.changeCase.upper(h.changeCase.snake(relationshipName)) %>]-(b {mc_id: 12002003})\n" +
            "RETURN r, b")
})
