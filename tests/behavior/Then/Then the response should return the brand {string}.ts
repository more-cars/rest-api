import {Then} from "@cucumber/cucumber"
import assert from "assert"
import Ajv from "ajv"
import {BrandNode} from "../../../src/types/brands/BrandNode"
import {BrandSchema} from "../../_schemas/BrandSchema"

Then('the response should return the brand {string}', function (label: string) {
    const expectedNode: BrandNode = this.brand[label]
    const actualNode: BrandNode = this.latestResponse.data

    // checking the schema
    const validate = new Ajv().compile(BrandSchema)
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
