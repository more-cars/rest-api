---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/get-all/requesting-a-paginated-node-collection.test.ts
---
import {describe, expect, test} from 'vitest'
import {deleteAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>} from "../../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/deleteAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>"
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {seed<%= h.changeCase.pascal(nodeType) %>} from "../../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/seed<%= h.changeCase.pascal(nodeType) %>"

describe('A sorted "get all <%= h.changeCase.upper(nodeType) %> nodes" request returns the nodes in correct order', () => {
    test('when there exist NO <%= h.changeCase.lower(nodeType) %> nodes', async () => {
        await deleteAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>()

        const expectedNodes: Array<<%= h.changeCase.pascal(nodeType) %>Node> = []
        const actualNodes = await <%= h.changeCase.pascal(nodeType) %>.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist <%= h.changeCase.lower(nodeType) %> nodes', async () => {
        await deleteAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>()
        const nodeA = await seed<%= h.changeCase.pascal(nodeType) %>({name: 'A Node'})
        const nodeB = await seed<%= h.changeCase.pascal(nodeType) %>({name: 'B Node'})
        const nodeC = await seed<%= h.changeCase.pascal(nodeType) %>({name: 'C Node'})

        const ascNodes = await <%= h.changeCase.pascal(nodeType) %>.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].name === nodeA.name)
        expect(ascNodes[1].name === nodeB.name)
        expect(ascNodes[2].name === nodeC.name)

        const descNodes = await <%= h.changeCase.pascal(nodeType) %>.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].name === nodeC.name)
        expect(descNodes[1].name === nodeB.name)
        expect(descNodes[2].name === nodeA.name)
    })
})
