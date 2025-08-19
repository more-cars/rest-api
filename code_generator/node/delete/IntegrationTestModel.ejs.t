---
to: tests/integration/models/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>/nodes/delete.test.ts
---
import {expect, test} from 'vitest'
import {<%= h.changeCase.pascal(nodetype) %>} from "../../../../../src/models/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>/<%= h.changeCase.pascal(nodetype) %>"
import {seed<%= h.changeCase.pascal(nodetype) %>} from "../../../../_toolbox/dbSeeding/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>/nodes/seed<%= h.changeCase.pascal(nodetype) %>"

test('Deleting an <%= h.changeCase.lower(nodetype) %> that does not exist should return "false"', async () => {
    const success = await <%= h.changeCase.pascal(nodetype) %>.delete(-42)

    expect(success)
        .toEqual(false)
})

test('When the <%= h.changeCase.lower(nodetype) %> exists it should be deleted', async () => {
    const node = await seed<%= h.changeCase.pascal(nodetype) %>()
    const success = await <%= h.changeCase.pascal(nodetype) %>.delete(node.id)

    expect(success)
        .toEqual(true)
})
