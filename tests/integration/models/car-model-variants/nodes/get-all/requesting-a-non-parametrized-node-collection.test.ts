import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {CarModelVariantNode} from "../../../../../../src/models/node-types/car-model-variants/types/CarModelVariantNode"
import {CarModelVariant} from "../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A non-parametrized "get all CAR MODEL VARIANT nodes" request returns the correct number of nodes', () => {
    test('when there exist no CAR MODEL VARIANT nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL_VARIANT)

        const expectedNodes: CarModelVariantNode[] = []
        const actualNodes = await CarModelVariant.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist CAR MODEL VARIANT nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL_VARIANT)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(NodeTypeEnum.CAR_MODEL_VARIANT, amount)

        const actualNodes = await CarModelVariant.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
