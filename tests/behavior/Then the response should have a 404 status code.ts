import {Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should have a 404 status code', function () {
    assert.equal(this.latestResponse.status, 404)
})
