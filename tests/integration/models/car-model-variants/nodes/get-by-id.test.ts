import {expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

test('Fetching a CAR MODEL VARIANT that does not exist should return "false"', async () => {
    const expectedCarModelVariant = false
    const actualCarModelVariant = await CarModelVariant.findById(-42)

    expect(actualCarModelVariant)
        .toEqual(expectedCarModelVariant)
})

test('When the CAR MODEL VARIANT exists it should be returned', async () => {
    const expectedCarModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const actualCarModelVariant = await CarModelVariant.findById(expectedCarModelVariant.properties.id)

    expect(actualCarModelVariant.attributes)
        .toEqual(expectedCarModelVariant.properties)
})
