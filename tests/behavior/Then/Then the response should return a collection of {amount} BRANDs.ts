import {Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should return a collection of {int} BRANDs',
    function (amount: number) {
        assert.equal(this.latestResponse.data.length, amount)
    })
