---
to: tests/integration/db/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>/nodes/delete.test.ts
---
import {expect, test} from 'vitest'
import {deleteNode} from "../../../../../src/db/nodes/deleteNode"
import {seed<%= h.changeCase.pascal(nodetype) %>} from "../../../../_toolbox/dbSeeding/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>/nodes/seed<%= h.changeCase.pascal(nodetype) %>"

test('Deleting an <%= h.changeCase.upper(nodetype) %> that does not exist should return "false"', async () => {
    const success = await deleteNode(-42)

    expect(success)
        .toBe(false)
})

test('Deleting an <%= h.changeCase.upper(nodetype) %> that does exist should return "true"', async () => {
    const node = await seed<%= h.changeCase.pascal(nodetype) %>()
    const success = await deleteNode(node.id)

    expect(success)
        .toBe(true)
})
