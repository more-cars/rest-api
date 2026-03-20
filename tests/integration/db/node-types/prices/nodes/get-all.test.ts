import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {PriceNode} from "../../../../../../src/db/node-types/prices/types/PriceNode"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../../src/db/node-types/prices/getAllNodesOfType"

test('When there are no PRICES then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Price)

    const expectedPrices: PriceNode[] = []
    const actualPrices = await getAllNodesOfType()

    expect(actualPrices)
        .toEqual(expectedPrices)
})

test('When PRICES exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Price)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.Price, amount)

    const actualPrices = await getAllNodesOfType()

    expect(actualPrices.length)
        .toEqual(amount)
})
