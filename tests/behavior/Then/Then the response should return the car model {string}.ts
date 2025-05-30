import {Then} from "@cucumber/cucumber"
import assert from "assert"
import Ajv from "ajv"
import {CarModelSchema} from "../../_schemas/CarModelSchema"
import {CarModelNode} from "../../../src/types/car-models/CarModelNode"

Then('the response should return the car model {string}', function (label: string) {
    const expectedNode: CarModelNode = this.carmodel[label]
    const actualNode: CarModelNode = this.latestResponse.data

    // checking the schema
    const validate = new Ajv().compile(CarModelSchema)
    const valid = validate(actualNode)
    if (!valid) {
        console.log(validate.errors)
        console.log(actualNode)
    }
    assert.ok(valid)

    // checking the data
    for (const expectedProperty in expectedNode) {
        // @ts-expect-error TS7053
        assert.equal(actualNode[expectedProperty], expectedNode[expectedProperty])
    }
})
