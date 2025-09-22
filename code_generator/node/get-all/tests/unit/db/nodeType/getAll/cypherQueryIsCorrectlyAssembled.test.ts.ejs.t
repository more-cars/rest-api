---
to: tests/unit/db/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getAll/cypherQueryIsCorrectlyAssembled.test.ts
---
import {expect, test} from 'vitest'
import {getAllNodesOfTypeQuery} from "../../../../../src/db/nodes/getAllNodesOfTypeQuery"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"

test('cypher query is correctly assembled for "Get all <%= h.changeCase.upper(h.inflection.pluralize(nodeType)) %>" request', async () => {
    const query = getAllNodesOfTypeQuery(NodeTypeLabel.<%= h.changeCase.pascal(nodeType) %>)

    expect(query)
        .toEqual(
            "MATCH (node:<%= h.changeCase.pascal(nodeType) %>)\n" +
            "RETURN node")
})
