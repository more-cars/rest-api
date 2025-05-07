import {getCarModelNodeById} from "../../../src/db/getCarModelNodeById"
import {createCarModelNode} from "../../../src/db/createCarModelNode"
import {faker} from "@faker-js/faker"
import {Neo4jError} from "neo4j-driver"
import Ajv from "ajv"
import {CarModelSchema} from "../../_schemas/CarModelSchema"
import {CarModelNode} from "../../../src/types/CarModelNode"
import {seedCarModel} from "../../dbSeeding/seedCarModel"

describe('Car Model', () => {
    test('Creating a car model with invalid data should not be possible', async () => {
        // Our first line of defense is TypeScript itself.
        // When providing an invalid data structure (in this case a non-existing field name)
        // the type checker would terminate the program instantly with error code TS2353.
        // When circumventing this type check via @ts-expect-error then Neo4j is the second line of defense.
        // The provided data should not be accepted, because the attribute mapping will not work anymore.
        // (The database query explicitly expects the field "name" to be present.)
        await expect(createCarModelNode({
            // @ts-expect-error see comment above
            bad_name: faker.vehicle.model(),
        })).rejects
            .toThrow(Neo4jError)
    })

    test('Creating a car model with valid data should result in a new database node', async () => {
        const carModelData = {
            name: faker.vehicle.model(),
            built_from: faker.number.int({min: 1000, max: 3000}),
            built_to: faker.number.int({min: 1000, max: 3000}),
            generation: faker.number.int({min: 1, max: 10}),
            internal_code: faker.commerce.isbn(),
            total_production: faker.number.int({min: 100, max: 10000000}),
        }
        const createdNode = await createCarModelNode(carModelData)

        expect(createdNode)
            .toEqual(expect.objectContaining(carModelData))
    })

    test('Querying a car model that does not exist should return "false"', async () => {
        const expectedCarModelNode = false
        const actualCarModelNode = await getCarModelNodeById(-42)

        expect(actualCarModelNode)
            .toBe(expectedCarModelNode)
    })

    test('Querying an existing car model should return a db node with correct schema', async () => {
        // ARRANGE
        const createdNode: CarModelNode = await seedCarModel()

        // ACT
        const carModelNode = await getCarModelNodeById(createdNode.id as number)

        // ASSERT
        const validate = new Ajv().compile(CarModelSchema)
        const valid = validate(carModelNode)
        if (!valid) {
            console.log(validate.errors)
        }

        expect(valid).toBe(true)
    })
})
