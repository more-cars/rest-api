import {faker} from "@faker-js/faker"
import {Neo4jError} from "neo4j-driver"
import {createNode} from "../../../../../src/db/car-models/createNode"

describe('Brand', () => {
    test('Creating a new node is not possible when mandatory fields are missing', async () => {
        // @ts-expect-error circumventing the typescript checks to force the error on database side
        await expect(createNode({
            built_to: faker.number.int({min: 1000, max: 3000}),
        })).rejects
            .toThrow(Neo4jError)
    })

    test('When providing valid data the new node can be created', async () => {
        const data = {
            name: faker.vehicle.model(),
            built_from: faker.number.int({min: 1000, max: 3000}),
            built_to: faker.number.int({min: 1000, max: 3000}),
            generation: faker.number.int({min: 1, max: 10}),
            internal_code: faker.commerce.isbn(),
            total_production: faker.number.int({min: 100, max: 10000000}),
        }
        const createdNode = await createNode(data)

        expect(createdNode)
            .toEqual(expect.objectContaining(data))
    })
})
