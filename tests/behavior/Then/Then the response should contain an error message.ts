import {Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should contain an error message', function () {
    const responseData = this.latestResponse.data

    assert(typeof responseData === "string", `"error message is not a string`)
})
