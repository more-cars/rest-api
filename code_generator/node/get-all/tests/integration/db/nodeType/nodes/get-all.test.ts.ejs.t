---
to: tests/integration/db/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/get-all.test.ts
---
import {expect, test} from 'vitest'
import {deleteAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>} from "../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/deleteAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>"
import {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {seed<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>} from "../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/seed<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>"
import {getAllNodesOfType} from "../../../../../src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getAllNodesOfType"

test('When there are no <%= h.changeCase.upper(h.inflection.pluralize(nodeType)) %> then an empty array should be returned', async () => {
    await deleteAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>()

    const expected<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>: Array<<%= h.changeCase.pascal(nodeType) %>Node> = []
    const actual<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %> = await getAllNodesOfType()

    expect(actual<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>)
        .toEqual(expected<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>)
})

test('When <%= h.changeCase.upper(h.inflection.pluralize(nodeType)) %> exist then all of them should be returned', async () => {
    await deleteAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>()
    const amount = Math.ceil(Math.random() * 50)
    await seed<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>(amount)

    const actual<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %> = await getAllNodesOfType()

    expect(actual<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.length)
        .toEqual(amount)
})
