---
to: tests/integration/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/get-all/requesting-a-paginated-node-collection.test.ts
---
import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all <%= h.changeCase.upper(nodeType) %> nodes" request returns the correct number of nodes', () => {
    test('when there exist no <%= h.changeCase.upper(nodeType) %> nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.<%= h.changeCase.pascal(nodeType) %>)

        const expectedNodes: <%= h.changeCase.pascal(nodeType) %>Node[] = []
        const actualNodes = await <%= h.changeCase.pascal(nodeType) %>.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist <%= h.changeCase.upper(nodeType) %> nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.<%= h.changeCase.pascal(nodeType) %>)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, amount)

        const actualNodes = await <%= h.changeCase.pascal(nodeType) %>.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
