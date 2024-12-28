import {CarModel} from "../../../src/models/CarModel"

describe('Car Model', () => {
    test('Fetching a car model that does not exist should return "false"', async () => {
        const expectedCarModel = false
        const actualCarModel = await CarModel.findById(-42)

        expect(actualCarModel)
            .toBe(expectedCarModel)
    })
})
