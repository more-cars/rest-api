import {faker} from "@faker-js/faker"
import {CarModel} from "../../../../src/models/CarModel"

describe('Car Model', () => {
    test('When providing valid data the new node can be created', async () => {
        const data = {
            name: faker.vehicle.model(),
            built_from: faker.number.int({min: 1000, max: 3000}),
            built_to: faker.number.int({min: 1000, max: 3000}),
            generation: faker.number.int({min: 1, max: 10}),
            internal_code: faker.commerce.isbn(),
            total_production: faker.number.int({min: 100, max: 10000000}),
        }
        const createdNode = await CarModel.create(data)

        expect(createdNode)
            .toEqual(expect.objectContaining(data))
    })
})
