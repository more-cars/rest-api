import {Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should return an empty list',
    function () {
        assert.equal(this.latestResponse.data.length, 0)
    })
