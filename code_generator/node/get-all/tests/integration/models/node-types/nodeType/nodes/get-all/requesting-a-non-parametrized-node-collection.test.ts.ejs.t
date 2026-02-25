---
to: tests/integration/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/get-all/requesting-a-non-parametrized-node-collection.test.ts
---
import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('A non-parametrized "get all <%= h.changeCase.upper(nodeType) %> nodes" request returns the correct number of nodes', () => {
    test('when there exist no <%= h.changeCase.upper(nodeType) %> nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>)

        const expectedNodes: <%= h.changeCase.pascal(nodeType) %>Node[] = []
        const actualNodes = await <%= h.changeCase.pascal(nodeType) %>.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist <%= h.changeCase.upper(nodeType) %> nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>, amount)

        const actualNodes = await <%= h.changeCase.pascal(nodeType) %>.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
