import {Then} from "@cucumber/cucumber"
import assert from "assert"
import Ajv from "ajv"
import {CarModelSchema} from "../unit/schemas/CarModelSchema"

Then('the response should return the car model A', function () {
    const expectedCarModel = this.carModelA
    const actualCarModel = this.latestResponse.data

    // checking the schema
    const ajv = new Ajv()
    const schema = CarModelSchema
    const validate = ajv.compile(schema)

    const valid = validate(actualCarModel)
    if (!valid) {
        console.log(validate.errors)
    }
    assert.ok(valid)

    // checking the values
    assert.equal(actualCarModel.id, expectedCarModel.id)
    assert.equal(actualCarModel.name, expectedCarModel.name)
})
