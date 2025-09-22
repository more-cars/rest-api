---
to: tests/integration/db/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/delete.test.ts
---
import {expect, test} from 'vitest'
import {deleteNode} from "../../../../../src/db/nodes/deleteNode"
import {seed<%= h.changeCase.pascal(nodeType) %>} from "../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/seed<%= h.changeCase.pascal(nodeType) %>"

test('Expecting response "false" when trying to delete a non-existing <%= h.changeCase.upper(nodeType) %>', async () => {
    const success = await deleteNode(-42)

    expect(success)
        .toBe(false)
})

test('Expecting response "true" when deleting an existing <%= h.changeCase.upper(nodeType) %>', async () => {
    const node = await seed<%= h.changeCase.pascal(nodeType) %>()
    const success = await deleteNode(node.id)

    expect(success)
        .toBe(true)
})
