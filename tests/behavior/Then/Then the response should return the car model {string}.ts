import {Then} from "@cucumber/cucumber"
import assert from "assert"
import Ajv from "ajv"
import {CarModelSchema} from "../../_schemas/CarModelSchema"
import {CarModelNode} from "../../../src/types/car-models/CarModelNode"

Then('the response should return the car model {string}', function (label: string) {
    const expectedCarModel: CarModelNode = this.carModel[label]
    const actualCarModel: CarModelNode = this.latestResponse.data

    // checking the schema
    const validate = new Ajv().compile(CarModelSchema)
    const valid = validate(actualCarModel)
    if (!valid) {
        console.log(validate.errors)
        console.log(actualCarModel)
    }
    assert.ok(valid)

    // checking the values
    assert.equal(actualCarModel.id, expectedCarModel.id)
    assert.equal(actualCarModel.name, expectedCarModel.name)
})
