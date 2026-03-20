import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {PriceNode} from "../../../../../../../src/db/node-types/prices/types/PriceNode"
import {Price} from "../../../../../../../src/models/node-types/prices/Price"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all PRICE nodes" request returns the nodes in correct order', () => {
    test('when there exist no PRICE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Price)

        const expectedNodes: PriceNode[] = []
        const actualNodes = await Price.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist PRICE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Price)
        const nodeA = await seedNode(DbNodeType.Price, {name: 'A Node'}) as PriceNode
        const nodeB = await seedNode(DbNodeType.Price, {name: 'B Node'}) as PriceNode
        const nodeC = await seedNode(DbNodeType.Price, {name: 'C Node'}) as PriceNode

        const ascNodes = await Price.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.price === nodeA.properties.price)
        expect(ascNodes[1].attributes.price === nodeB.properties.price)
        expect(ascNodes[2].attributes.price === nodeC.properties.price)

        const descNodes = await Price.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.price === nodeC.properties.price)
        expect(descNodes[1].attributes.price === nodeB.properties.price)
        expect(descNodes[2].attributes.price === nodeA.properties.price)
    })
})
