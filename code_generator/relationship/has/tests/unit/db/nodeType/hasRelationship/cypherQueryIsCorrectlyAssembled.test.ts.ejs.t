---
to: tests/unit/db/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/has<%= h.changeCase.pascal(relationshipName) %>Relationship/cypherQueryIsCorrectlyAssembled.test.ts
---
import {expect, test} from 'vitest'
import {getSpecificRelationshipQuery} from "../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('cypher query is correctly assembled', async () => {
    const query = getSpecificRelationshipQuery(
        12002002, // <%= h.changeCase.title(startNodeType) %>
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        12002003, // <%= h.changeCase.title(endNodeType) %>
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:<%= h.changeCase.upper(h.changeCase.snake(relationshipName)) %>]-(b {mc_id: 12002003})\n" +
            "RETURN r")
})
