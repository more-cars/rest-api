---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/get-all/requesting-a-paginated-node-collection.test.ts
---
import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {deleteAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>} from "../../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/deleteAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>"
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {seed<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>} from "../../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/seed<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>"

describe('A paginated "get all <%= h.changeCase.upper(nodeType) %> nodes" request returns the correct number of nodes', () => {
    test('when there exist NO <%= h.changeCase.lower(nodeType) %> nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>)

        const expectedNodes: Array<<%= h.changeCase.pascal(nodeType) %>Node> = []
        const actualNodes = await <%= h.changeCase.pascal(nodeType) %>.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist <%= h.changeCase.lower(nodeType) %> nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>)
        const amount = Math.ceil(Math.random() * 20)
        await seed<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>(amount)

        const actualNodes = await <%= h.changeCase.pascal(nodeType) %>.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
