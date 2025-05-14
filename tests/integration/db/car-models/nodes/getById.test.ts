import Ajv from "ajv"
import {getNodeById} from "../../../../../src/db/car-models/getNodeById"
import {CarModelNode} from "../../../../../src/types/car-models/CarModelNode"
import {seedCarModel} from "../../../../dbSeeding/seedCarModel"
import {CarModelSchema} from "../../../../_schemas/CarModelSchema"

describe('Car Model', () => {
    test('Querying a brand that does not exist should return "false"', async () => {
        const expectedCarModelNode = false
        const actualCarModelNode = await getNodeById(-42)

        expect(actualCarModelNode)
            .toBe(expectedCarModelNode)
    })

    test('Querying an existing brand should return a db node with correct schema', async () => {
        // ARRANGE
        const createdNode: CarModelNode = await seedCarModel()

        // ACT
        const carModelNode = await getNodeById(createdNode.id as number)

        // ASSERT
        const validate = new Ajv().compile(CarModelSchema)
        const valid = validate(carModelNode)
        if (!valid) {
            console.log(validate.errors)
        }

        expect(valid).toBe(true)
    })
})
