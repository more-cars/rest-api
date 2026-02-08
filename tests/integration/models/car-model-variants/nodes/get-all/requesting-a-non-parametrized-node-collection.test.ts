import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {CarModelVariantNode} from "../../../../../../src/models/car-model-variants/types/CarModelVariantNode"
import {CarModelVariant} from "../../../../../../src/models/car-model-variants/CarModelVariant"
import {seedCarModelVariants} from "../../../../../_toolbox/dbSeeding/car-model-variants/nodes/seedCarModelVariants"

describe('A non-parametrized "get all CAR MODEL VARIANT nodes" request returns the correct number of nodes', () => {
    test('when there exist NO car model variant nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL_VARIANT)

        const expectedNodes: Array<CarModelVariantNode> = []
        const actualNodes = await CarModelVariant.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist car model variant nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL_VARIANT)
        const amount = Math.ceil(Math.random() * 20)
        await seedCarModelVariants(amount)

        const actualNodes = await CarModelVariant.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
