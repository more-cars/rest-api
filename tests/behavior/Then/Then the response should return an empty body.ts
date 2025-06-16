import {Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should return an empty body',
    function () {
        assert.equal(this.latestResponse.data, "")
    })
