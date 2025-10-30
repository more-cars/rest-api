import {expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../src/models/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {CarModelVariantNode} from "../../../../../src/models/car-model-variants/types/CarModelVariantNode"

test('Fetching a CAR MODEL VARIANT that does not exist should return "false"', async () => {
    const expectedCarModelVariant = false
    const actualCarModelVariant = await CarModelVariant.findById(-42)

    expect(actualCarModelVariant)
        .toEqual(expectedCarModelVariant)
})

test('When the CAR MODEL VARIANT exists it should be returned', async () => {
    const expectedCarModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT) as CarModelVariantNode
    const actualCarModelVariant = await CarModelVariant.findById(expectedCarModelVariant.id)

    expect(actualCarModelVariant)
        .toEqual(expectedCarModelVariant)
})
