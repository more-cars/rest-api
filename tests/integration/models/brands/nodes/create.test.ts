import {faker} from "@faker-js/faker"
import {Brand} from "../../../../../src/models/Brand"

describe('Brand', () => {
    test('When providing valid data the new node can be created', async () => {
        const data = {
            name: faker.vehicle.manufacturer(),
            full_name: faker.vehicle.manufacturer(),
            founded: faker.number.int({min: 1000, max: 3000}),
            defunct: faker.number.int({min: 1000, max: 3000}),
            wmi: faker.vehicle.vrm(),
            hsn: faker.vehicle.vrm(),
        }
        const createdNode = await Brand.create(data)

        expect(createdNode)
            .toEqual(expect.objectContaining(data))
    })
})
