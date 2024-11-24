import {Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should return with status code 404', function () {
    assert.equal(this.latestResponse.status, 404)
})
