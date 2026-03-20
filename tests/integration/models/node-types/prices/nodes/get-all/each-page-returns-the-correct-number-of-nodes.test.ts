import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {PriceNode} from "../../../../../../../src/models/node-types/prices/types/PriceNode"
import {Price} from "../../../../../../../src/models/node-types/prices/Price"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all PRICE nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no PRICE nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.Price)

        const expectedNodes: PriceNode[] = []
        const actualNodes = await Price.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 PRICE nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.Price)
        await seedNodes(DbNodeType.Price, totalNodeAmount)

        const actualNodes = await Price.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
