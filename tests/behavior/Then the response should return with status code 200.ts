import {Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should return with status code 200', function () {
    assert.equal(this.latestResponse.status, 200)
})
