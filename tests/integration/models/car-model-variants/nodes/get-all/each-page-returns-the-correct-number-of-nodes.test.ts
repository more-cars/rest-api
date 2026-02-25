import {describe, expect, test} from 'vitest'
import type {CarModelVariantNode} from "../../../../../../src/models/node-types/car-model-variants/types/CarModelVariantNode"
import {CarModelVariant} from "../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"

describe('Each page of a "get all CAR MODEL VARIANT nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no CAR MODEL VARIANT nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.CarModelVariant)

        const expectedNodes: CarModelVariantNode[] = []
        const actualNodes = await CarModelVariant.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 CAR MODEL VARIANT nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.CarModelVariant)
        await seedNodes(DbNodeType.CarModelVariant, totalNodeAmount)

        const actualNodes = await CarModelVariant.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
