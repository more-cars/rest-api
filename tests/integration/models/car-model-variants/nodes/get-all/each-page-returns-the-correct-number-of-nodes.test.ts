import {describe, expect, test} from 'vitest'
import {deleteAllCarModelVariants} from "../../../../../_toolbox/dbSeeding/car-model-variants/nodes/deleteAllCarModelVariants"
import type {CarModelVariantNode} from "../../../../../../src/models/car-model-variants/types/CarModelVariantNode"
import {CarModelVariant} from "../../../../../../src/models/car-model-variants/CarModelVariant"
import {seedCarModelVariants} from "../../../../../_toolbox/dbSeeding/car-model-variants/nodes/seedCarModelVariants"

describe('Each page of a "get all CAR MODEL VARIANT nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist NO car model variant nodes (page=$0)', async (page) => {
        await deleteAllCarModelVariants()

        const expectedNodes: Array<CarModelVariantNode> = []
        const actualNodes = await CarModelVariant.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 car model variant nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllCarModelVariants()
        await seedCarModelVariants(totalNodeAmount)

        const actualNodes = await CarModelVariant.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
