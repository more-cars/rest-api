---
to: tests/unit/db/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/get<%= h.changeCase.pascal(relationshipName) %>Relationship/cypherQueryIsCorrectlyAssembled.test.ts
---
import {expect, test} from 'vitest'
import {getRelationshipForSpecificNodeQuery} from "../../../../../src/db/relationships/getRelationshipForSpecificNode"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('cypher query is correctly assembled for "get sole relationship" request', async () => {
    const query = getRelationshipForSpecificNodeQuery(
        12002002, // <%= h.changeCase.title(startNodeType) %>
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:<%= h.changeCase.upper(h.changeCase.snake(relationshipName)) %>]-(b)\n" +
            "RETURN r, b\n" +
            "  LIMIT 1")
})
