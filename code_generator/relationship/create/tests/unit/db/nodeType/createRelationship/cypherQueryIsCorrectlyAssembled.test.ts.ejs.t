---
to: tests/unit/db/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/create<%= h.changeCase.pascal(relationshipName) %>Relationship/cypherQueryIsCorrectlyAssembled.test.ts
---
import {expect, test} from 'vitest'
import {createRelationshipQuery} from "../../../../../src/db/relationships/createDbRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('cypher query is correctly assembled for "create relationship" request', async () => {
    const query = createRelationshipQuery(
        12002002, // <%= h.changeCase.title(startNodeType) %>
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        12002003) // <%= h.changeCase.title(endNodeType) %>

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002}), (b {mc_id: 12002003})\n" +
            "CREATE (a)-[r:<%= h.changeCase.constant(relationshipName) %>]->(b)\n" +
            "RETURN r\n" +
            "  LIMIT 1")
})
