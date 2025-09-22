---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/delete.test.ts
---
import {expect, test} from 'vitest'
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {seed<%= h.changeCase.pascal(nodeType) %>} from "../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/seed<%= h.changeCase.pascal(nodeType) %>"

test('Deleting an <%= h.changeCase.lower(nodeType) %> that does not exist should return "false"', async () => {
    const success = await <%= h.changeCase.pascal(nodeType) %>.delete(-42)

    expect(success)
        .toEqual(false)
})

test('When the <%= h.changeCase.lower(nodeType) %> exists it should be deleted', async () => {
    const node = await seed<%= h.changeCase.pascal(nodeType) %>()
    const success = await <%= h.changeCase.pascal(nodeType) %>.delete(node.id)

    expect(success)
        .toEqual(true)
})
