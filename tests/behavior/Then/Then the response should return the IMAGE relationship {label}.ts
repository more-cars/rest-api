import {Then} from "@cucumber/cucumber"
import assert from "assert"
import Ajv from "ajv"
import {ImageBelongsToNodeRelationship} from "../../../src/types/images/ImageBelongsToNodeRelationship"
import {ImageBelongsToNodeSchema} from "../../_schemas/ImageBelongsToNodeSchema"

Then('the response should return the IMAGE relationship {string}', function (label: string) {
    const expectedRelationship: ImageBelongsToNodeRelationship = this.relationship[label]
    const actualRelationship: ImageBelongsToNodeRelationship = this.latestResponse.data

    // checking the schema
    const validate = new Ajv().compile(ImageBelongsToNodeSchema)
    const valid = validate(actualRelationship)
    if (!valid) {
        console.log(validate.errors)
        console.log(actualRelationship)
    }
    assert.ok(valid)

    // checking the data
    for (const expectedProperty in expectedRelationship) {
        // @ts-expect-error TS7053
        assert.equal(actualRelationship[expectedProperty], expectedRelationship[expectedProperty])
    }
})
