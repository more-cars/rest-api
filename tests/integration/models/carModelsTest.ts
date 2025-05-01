import {CarModel} from "../../../src/models/CarModel"
import {deleteAllCarModels} from "../../dbSeeding/deleteAllCarModels"
import {seedCarModels} from "../../dbSeeding/seedCarModels"

describe('Car Models', () => {
    test('When there are no car models then an empty array should be returned', async () => {
        await deleteAllCarModels()

        const expectedCarModels: Array<CarModel> = []
        const actualCarModels = await CarModel.findAll()

        expect(actualCarModels)
            .toEqual(expectedCarModels)
    })

    test('When car models exist then all of them should be returned', async () => {
        await deleteAllCarModels()
        const amount = Math.ceil(Math.random() * 50)
        await seedCarModels(amount)

        const actualCarModels = await CarModel.findAll()

        expect(actualCarModels.length)
            .toEqual(amount)
    })
})
