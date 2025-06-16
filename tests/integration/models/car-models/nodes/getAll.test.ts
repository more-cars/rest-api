import {deleteAllCarModels} from "../../../../dbSeeding/car-models/nodes/deleteAllCarModels"
import {CarModelNode} from "../../../../../src/types/car-models/CarModelNode"
import {CarModel} from "../../../../../src/models/car-models/CarModel"
import {seedCarModels} from "../../../../dbSeeding/car-models/nodes/seedCarModels"

test('When there are no car models then an empty array should be returned', async () => {
    await deleteAllCarModels()

    const expectedCarModels: Array<CarModelNode> = []
    const actualCarModels = await CarModel.findAll()

    expect(actualCarModels)
        .toEqual(expectedCarModels)
})

test('When brands exist then all of them should be returned', async () => {
    await deleteAllCarModels()
    const amount = Math.ceil(Math.random() * 50)
    await seedCarModels(amount)

    const actualCarModels = await CarModel.findAll()

    expect(actualCarModels.length)
        .toEqual(amount)
})
