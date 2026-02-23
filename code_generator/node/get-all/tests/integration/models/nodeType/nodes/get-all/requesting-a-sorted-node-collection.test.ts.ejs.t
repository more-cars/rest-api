---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/get-all/requesting-a-sorted-node-collection.test.ts
---
import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../../src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all <%= h.changeCase.upper(nodeType) %> nodes" request returns the nodes in correct order', () => {
    test('when there exist no <%= h.changeCase.upper(nodeType) %> nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.<%= h.changeCase.pascal(nodeType) %>)

        const expectedNodes: <%= h.changeCase.pascal(nodeType) %>Node[] = []
        const actualNodes = await <%= h.changeCase.pascal(nodeType) %>.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist <%= h.changeCase.upper(nodeType) %> nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.<%= h.changeCase.pascal(nodeType) %>)
        const nodeA = await seedNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, {name: 'A Node'}) as <%= h.changeCase.pascal(nodeType) %>Node
        const nodeB = await seedNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, {name: 'B Node'}) as <%= h.changeCase.pascal(nodeType) %>Node
        const nodeC = await seedNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, {name: 'C Node'}) as <%= h.changeCase.pascal(nodeType) %>Node

        const ascNodes = await <%= h.changeCase.pascal(nodeType) %>.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await <%= h.changeCase.pascal(nodeType) %>.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
