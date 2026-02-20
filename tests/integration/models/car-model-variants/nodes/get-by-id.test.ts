import {expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

test('Fetching a CAR MODEL VARIANT that does not exist should return "false"', async () => {
    const expectedCarModelVariant = false
    const actualCarModelVariant = await CarModelVariant.findById(-42)

    expect(actualCarModelVariant)
        .toEqual(expectedCarModelVariant)
})

test('When the CAR MODEL VARIANT exists it should be returned', async () => {
    const expectedCarModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
    const actualCarModelVariant = await CarModelVariant.findById(expectedCarModelVariant.properties.id)

    expect(actualCarModelVariant)
        .toEqual(expectedCarModelVariant.properties)
})
