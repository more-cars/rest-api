import {Then} from "@cucumber/cucumber"
import assert from "assert"
import Ajv from "ajv"
import {CarModelSchema} from "../_schemas/CarModelSchema"
import {CarModelType} from "../../src/types/CarModelType"

Then('the response should return the car model A', function () {
    const expectedCarModel: CarModelType = this.carModelA
    const actualCarModel: CarModelType = this.latestResponse.data

    // checking the schema
    const validate = new Ajv().compile(CarModelSchema)
    const valid = validate(actualCarModel)
    if (!valid) {
        console.log(validate.errors)
        console.log(actualCarModel)
    }
    assert.ok(valid)

    // checking the values
    assert.equal(actualCarModel.mc_id, expectedCarModel.mc_id)
    assert.equal(actualCarModel.name, expectedCarModel.name)
})
