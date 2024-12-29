import {getCarModelNodeById} from "../../../src/db/getCarModelNodeById"
import {createCarModelNode} from "../../../src/db/createCarModelNode"
import {faker} from "@faker-js/faker"
import {Neo4jError} from "neo4j-driver"

describe('Car Model', () => {
    test('Creating a car model with invalid data should not be possible', async () => {
        // Our first line of defense is TypeScript itself.
        // When providing invalid data (in this case a non-existing field name)
        // the type checker would terminate the program instantly with error code TS2353.
        // When circumventing this type check via @ts-ignore then Neo4j is the second line of defense.
        // The provided data should not be accepted, because the attribute mapping will not work anymore.
        await expect(createCarModelNode({
            mc_id: 987654,
            // @ts-ignore
            bad_name: faker.vehicle.model(),
        })).rejects
            .toThrow(Neo4jError)
    })

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
