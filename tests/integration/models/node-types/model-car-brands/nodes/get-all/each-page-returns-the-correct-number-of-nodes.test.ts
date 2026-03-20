import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {ModelCarBrandNode} from "../../../../../../../src/models/node-types/model-car-brands/types/ModelCarBrandNode"
import {ModelCarBrand} from "../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all MODEL CAR BRAND nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no MODEL CAR BRAND nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.ModelCarBrand)

        const expectedNodes: ModelCarBrandNode[] = []
        const actualNodes = await ModelCarBrand.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 MODEL CAR BRAND nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.ModelCarBrand)
        await seedNodes(DbNodeType.ModelCarBrand, totalNodeAmount)

        const actualNodes = await ModelCarBrand.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
