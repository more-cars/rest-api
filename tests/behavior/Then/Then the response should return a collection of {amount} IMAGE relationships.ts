import {Then} from "@cucumber/cucumber"
import assert from "assert"
import Ajv from "ajv"
import {ImageBelongsToNodeRelationship} from "../../../src/types/images/ImageBelongsToNodeRelationship"
import {ImageBelongsToNodeSchema} from "../../_schemas/ImageBelongsToNodeSchema"

Then('the response should return a collection of {int} IMAGE relationships', function (amount: number) {
    const relationships: Array<ImageBelongsToNodeRelationship> = this.latestResponse.data

    assert.equal(relationships.length, amount)

    relationships.forEach(relationship => {
        const validate = new Ajv().compile(ImageBelongsToNodeSchema)
        const valid = validate(relationship)
        if (!valid) {
            console.log(validate.errors)
            console.log(relationship)
        }
        assert.ok(valid)
    })
})
