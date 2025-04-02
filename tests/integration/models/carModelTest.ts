import {CarModel} from "../../../src/models/CarModel"
import {faker} from "@faker-js/faker"

describe('Car Model', () => {
    test('Fetching a car model that does not exist should return "false"', async () => {
        const expectedCarModel = false
        const actualCarModel = await CarModel.findById(-42)

        expect(actualCarModel)
            .toBe(expectedCarModel)
    })

    test('Creating a car model with valid data should return the new node', async () => {
        const carModelData = {
            name: faker.vehicle.model(),
        }
        const createdNode = await CarModel.create(carModelData)

        expect(createdNode)
            .toEqual(expect.objectContaining(carModelData))
    })
})
