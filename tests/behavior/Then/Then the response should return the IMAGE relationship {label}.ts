import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ImageBelongsToNodeRelationship} from "../../../src/models/images/types/ImageBelongsToNodeRelationship"
import {ImageBelongsToNodeSchema} from "../../_toolbox/schemas/ImageBelongsToNodeSchema"
import {validateJson} from "../../_toolbox/validateJson"

Then('the response should return the IMAGE relationship {string}', function (label: string) {
    const expectedRelationship: ImageBelongsToNodeRelationship = this.relationship[label]
    const actualRelationship: ImageBelongsToNodeRelationship = this.latestResponse.data

    assert.ok(validateJson(actualRelationship, ImageBelongsToNodeSchema))

    for (const expectedProperty in expectedRelationship) {
        // @ts-expect-error TS7053
        assert.equal(actualRelationship[expectedProperty], expectedRelationship[expectedProperty])
    }
})
