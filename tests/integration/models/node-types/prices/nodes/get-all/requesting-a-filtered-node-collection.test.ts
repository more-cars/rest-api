import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {PriceNode} from "../../../../../../../src/db/node-types/prices/types/PriceNode"
import {Price} from "../../../../../../../src/models/node-types/prices/Price"
import {FilterOperator} from "../../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all PRICE nodes" request returns only the matching nodes', () => {
    test('when there exist no PRICE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Price)

        const expectedNodes: PriceNode[] = []
        const actualNodes = await Price.findAll({
            filterByProperty: 'price',
            filterValue: 99,
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist PRICE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Price)
        const nodeA = await seedNode(DbNodeType.Price, {price: 99}) as PriceNode
        await seedNode(DbNodeType.Price, {price: 70})
        await seedNode(DbNodeType.Price, {price: 71})

        const filteredNodes = await Price.findAll({
            filterByProperty: 'price',
            filterValue: 99,
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.price === nodeA.properties.price)
    })
})
