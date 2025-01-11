import {getCarModelNodeById} from "../../../src/db/getCarModelNodeById"
import {createCarModelNode} from "../../../src/db/createCarModelNode"
import {faker} from "@faker-js/faker"
import {Neo4jError} from "neo4j-driver"
import Ajv from "ajv"
import {CarModelSchema} from "../../_schemas/CarModelSchema"

describe('Car Model', () => {
    test('Creating a car model with invalid data should not be possible', async () => {
        // Our first line of defense is TypeScript itself.
        // When providing invalid data (in this case a non-existing field name)
        // the type checker would terminate the program instantly with error code TS2353.
        // When circumventing this type check via @ts-ignore then Neo4j is the second line of defense.
        // The provided data should not be accepted, because the attribute mapping will not work anymore.
        // @ts-ignore
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

    test('Querying an existing car model should return a db node with correct schema', async () => {
        // ARRANGE
        const nodeId = faker.number.int({max: 10000})
        await createCarModelNode({
            mc_id: nodeId,
            name: faker.vehicle.model(),
        })

        // ACT
        const carModelNode = await getCarModelNodeById(nodeId)

        // ASSERT
        const validate = new Ajv().compile(CarModelSchema)
        const valid = validate(carModelNode)
        if (!valid) {
            console.log(validate.errors)
        }

        expect(valid).toBe(true)
    })
})
