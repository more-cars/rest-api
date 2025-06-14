import {CarModel} from "../../../../../src/models/car-models/CarModel"
import {seedCarModel} from "../../../../dbSeeding/car-models/nodes/seedCarModel"

describe('Car Model', () => {
    test('Fetching a car model that does not exist should return "false"', async () => {
        const expectedCarModel = false
        const actualCarModel = await CarModel.findById(-42)

        expect(actualCarModel)
            .toEqual(expectedCarModel)
    })

    test('When the car model exists it should be returned', async () => {
        const expectedCarModel = await seedCarModel()
        const actualCarModel = await CarModel.findById(expectedCarModel.id as number)

        expect(actualCarModel)
            .toEqual(expectedCarModel)
    })
})
