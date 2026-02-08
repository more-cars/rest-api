import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariantNode} from "../../../../../../src/models/car-model-variants/types/CarModelVariantNode"
import {CarModelVariant} from "../../../../../../src/models/car-model-variants/CarModelVariant"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all CAR MODEL VARIANT nodes" request returns the correct number of nodes', () => {
    test('when there exist NO car model variant nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL_VARIANT)

        const expectedNodes: Array<CarModelVariantNode> = []
        const actualNodes = await CarModelVariant.findAll({page: 1})

        expect(expectedNodes)
            .toEqual(actualNodes)
    })

    test('when there exist car model variant nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL_VARIANT)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(NodeTypeEnum.CAR_MODEL_VARIANT, amount)

        const actualNodes = await CarModelVariant.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
