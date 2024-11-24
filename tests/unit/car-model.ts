import Ajv from "ajv"
import {CarModel} from "../../src/models/CarModel"
import {CarModelSchema} from "./schemas/CarModelSchema"

describe('Car Models', () => {
    test('Requesting a car model that does not exist', () => {
        const foundCarModel = CarModel.findById(-42)
        expect(foundCarModel).toBe(false)
    })

    test('Requesting an existing car model should return a node with valid schema', () => {
        const foundCarModel = CarModel.findById(555)

        const ajv = new Ajv()
        const schema = CarModelSchema
        const validate = ajv.compile(schema)

        const valid = validate(foundCarModel)
        if (!valid) {
            console.log(validate.errors)
        }
        expect(valid).toBe(true)
    })
})
