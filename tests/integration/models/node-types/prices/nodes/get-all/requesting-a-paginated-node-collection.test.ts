import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {PriceNode} from "../../../../../../../src/models/node-types/prices/types/PriceNode"
import {Price} from "../../../../../../../src/models/node-types/prices/Price"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all PRICE nodes" request returns the correct number of nodes', () => {
    test('when there exist no PRICE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Price)

        const expectedNodes: PriceNode[] = []
        const actualNodes = await Price.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist PRICE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Price)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.Price, amount)

        const actualNodes = await Price.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
