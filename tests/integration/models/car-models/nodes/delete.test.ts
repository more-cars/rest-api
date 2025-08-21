import {expect, test} from 'vitest'
import {CarModel} from "../../../../../src/models/car-models/CarModel"
import {seedCarModel} from "../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"

test('Deleting an car model that does not exist should return "false"', async () => {
    const success = await CarModel.delete(-42)

    expect(success)
        .toEqual(false)
})

test('When the car model exists it should be deleted', async () => {
    const node = await seedCarModel()
    const success = await CarModel.delete(node.id)

    expect(success)
        .toEqual(true)
})
