import {Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the properties {string} and {string} in the response should be identical', function (property_1: string, property_2: string) {
    const responseData = this.latestResponse.data

    assert.equal(
        responseData[property_1],
        responseData[property_2],
        `"${responseData[property_1]}" and "${responseData[property_2]}" are not identical`
    )
})
