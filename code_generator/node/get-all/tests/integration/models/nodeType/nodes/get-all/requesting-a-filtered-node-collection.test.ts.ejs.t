---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/get-all/requesting-a-filtered-node-collection.test.ts
---
import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all <%= h.changeCase.upper(nodeType) %> nodes" request returns only the matching nodes', () => {
    test('when there exist no <%= h.changeCase.upper(nodeType) %> nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>)

        const expectedNodes: <%= h.changeCase.pascal(nodeType) %>Node[] = []
        const actualNodes = await <%= h.changeCase.pascal(nodeType) %>.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist <%= h.changeCase.upper(nodeType) %> nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>)
        const nodeA = await seedNode(NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>, {name: 'A Node'}) as <%= h.changeCase.pascal(nodeType) %>Node
        await seedNode(NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>, {name: 'B Node'})
        await seedNode(NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>, {name: 'C Node'})

        const filteredNodes = await <%= h.changeCase.pascal(nodeType) %>.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
