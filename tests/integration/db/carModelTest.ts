import {getCarModelNodeById} from "../../../src/db/getCarModelNodeById"
import {createCarModelNode} from "../../../src/db/createCarModelNode"
import {faker} from "@faker-js/faker"

describe('Car Model', () => {
    test('Creating a car model with valid data should result in a new database node', async () => {
        const carModelData = {
            mc_id: faker.number.int({max: 10000}),
            name: faker.vehicle.model(),
        }
        const createdNode = await createCarModelNode(carModelData)

        expect(createdNode)
            .toEqual(carModelData)
    })

    test('Querying a car model that does not exist should return "false"', async () => {
        const expectedCarModelNode = false
        const actualCarModelNode = await getCarModelNodeById(-42)

        expect(actualCarModelNode)
            .toBe(expectedCarModelNode)
    })
})
