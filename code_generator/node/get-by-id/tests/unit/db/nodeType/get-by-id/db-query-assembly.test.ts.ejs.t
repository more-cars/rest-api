---
to: tests/unit/db/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/get-by-id/db-query-assembly.test.ts
---
import {expect, test} from 'vitest'
import {getNodeByIdQuery} from "../../../../../src/db/nodes/getNodeById"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"

test('cypher query is correctly assembled for "Get <%= h.changeCase.upper(nodeType) %> by ID" request', async () => {
    const query = getNodeByIdQuery(42, NodeTypeLabel.<%= h.changeCase.pascal(nodeType) %>)

    expect(query)
        .toEqual(
            "MATCH (node:<%= h.changeCase.pascal(nodeType) %> {mc_id: 42})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
