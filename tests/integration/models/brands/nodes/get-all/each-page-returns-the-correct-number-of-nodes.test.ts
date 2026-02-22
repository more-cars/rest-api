import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {BrandNode} from "../../../../../../src/models/node-types/brands/types/BrandNode"
import {Brand} from "../../../../../../src/models/node-types/brands/Brand"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Each page of a "get all BRAND nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no BRAND nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.Brand)

        const expectedNodes: BrandNode[] = []
        const actualNodes = await Brand.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 BRAND nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.Brand)
        await seedNodes(DbNodeType.Brand, totalNodeAmount)

        const actualNodes = await Brand.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
