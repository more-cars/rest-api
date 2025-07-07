import {Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should return a collection of {int} CAR MODELs',
    function (amount: number) {
        assert.equal(this.latestResponse.data.length, amount)
    })
