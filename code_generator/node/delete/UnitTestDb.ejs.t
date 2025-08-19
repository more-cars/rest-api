---
to: tests/unit/db/<%= h.inflection.pluralize(h.changeCase.camel(nodetype)) %>/delete/cypherQueryIsCorrectlyAssembled.test.ts
---
import {expect, test} from 'vitest'
import {deleteNodeQuery} from "../../../../../src/db/nodes/deleteNode"

test('cypher query is correctly assembled for "delete <%= h.inflection.humanize(nodetype) %>" request', async () => {
    const query = deleteNodeQuery(41)

    expect(query)
        .toEqual(
            "MATCH (node {mc_id: 41})\n" +
            "DETACH DELETE node")
})
