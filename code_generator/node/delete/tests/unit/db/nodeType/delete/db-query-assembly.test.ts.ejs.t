---
to: tests/unit/db/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/delete/db-query-assembly.test.ts
---
import {expect, test} from 'vitest'
import {deleteNodeQuery} from "../../../../../src/db/nodes/deleteNode"

test('cypher query is correctly assembled for "Delete <%= h.changeCase.upper(nodeType) %>" request', async () => {
    const query = deleteNodeQuery(41)

    expect(query)
        .toEqual(
            "MATCH (node {mc_id: 41})\n" +
            "DETACH DELETE node")
})
