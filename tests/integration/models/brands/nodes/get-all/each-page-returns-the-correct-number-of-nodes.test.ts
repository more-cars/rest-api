import {describe, expect, test} from 'vitest'
import {deleteAllBrands} from "../../../../../_toolbox/dbSeeding/brands/nodes/deleteAllBrands"
import type {BrandNode} from "../../../../../../src/models/brands/types/BrandNode"
import {Brand} from "../../../../../../src/models/brands/Brand"
import {seedBrands} from "../../../../../_toolbox/dbSeeding/brands/nodes/seedBrands"

describe('Each page of a "get all BRAND nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist NO brand nodes (page=$0)', async (page) => {
        await deleteAllBrands()

        const expectedNodes: Array<BrandNode> = []
        const actualNodes = await Brand.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 brand nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllBrands()
        await seedBrands(totalNodeAmount)

        const actualNodes = await Brand.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
