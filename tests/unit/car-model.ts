import {CarModel} from "../../src/models/CarModel"

describe('Car Models', () => {
    test('Requesting a car model that does not exist', () => {
        const foundCarModel = CarModel.findById(-42)
        expect(foundCarModel).toBe(false)
    })
})
