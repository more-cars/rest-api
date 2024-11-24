import {Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should return with status code {int}', function (statusCode: number) {
    assert.equal(this.latestResponse.status, statusCode)
})
