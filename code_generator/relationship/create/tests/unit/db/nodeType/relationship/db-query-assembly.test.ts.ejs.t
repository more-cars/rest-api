---
to: tests/unit/db/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.kebab(relationshipName) %>/create/db-query-assembly.test.ts
---
import {expect, test} from 'vitest'
import {createRelationshipQuery} from "../../../../../src/db/relationships/createDbRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('assembled database query for creating a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', async () => {
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
