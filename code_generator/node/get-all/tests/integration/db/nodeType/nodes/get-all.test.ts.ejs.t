---
to: tests/integration/db/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/get-all.test.ts
---
import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getAllNodesOfType"

test('When there are no <%= h.changeCase.upper(h.inflection.pluralize(nodeType)) %> then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.<%= h.changeCase.pascal(nodeType) %>)

    const expected<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>: <%= h.changeCase.pascal(nodeType) %>Node[] = []
    const actual<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %> = await getAllNodesOfType()

    expect(actual<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>)
        .toEqual(expected<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>)
})

test('When <%= h.changeCase.upper(h.inflection.pluralize(nodeType)) %> exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.<%= h.changeCase.pascal(nodeType) %>)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, amount)

    const actual<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %> = await getAllNodesOfType()

    expect(actual<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.length)
        .toEqual(amount)
})
