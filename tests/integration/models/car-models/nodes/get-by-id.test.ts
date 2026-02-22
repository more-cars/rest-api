import {expect, test} from 'vitest'
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

test('Fetching a car model that does not exist should return "false"', async () => {
    const expectedCarModel = false
    const actualCarModel = await CarModel.findById(-42)

    expect(actualCarModel)
        .toEqual(expectedCarModel)
})

test('When the car model exists it should be returned', async () => {
    const expectedCarModel = await seedNode(DbNodeType.CarModel)
    const actualCarModel = await CarModel.findById(expectedCarModel.properties.id)

    expect(actualCarModel.attributes)
        .toEqual(expectedCarModel.properties)
})
