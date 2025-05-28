import {Then} from "@cucumber/cucumber"
import assert from "assert"
import Ajv from "ajv"
import {ImageNode} from "../../../src/types/images/ImageNode"
import {ImageSchema} from "../../_schemas/ImageSchema"

Then('the response should return the image {string}', function (label: string) {
    const expectedNode: ImageNode = this.image[label]
    const actualNode: ImageNode = this.latestResponse.data

    // checking the schema
    const validate = new Ajv().compile(ImageSchema)
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
