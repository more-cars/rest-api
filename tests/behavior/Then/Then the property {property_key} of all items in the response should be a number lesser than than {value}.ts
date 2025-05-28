import {Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the property {string} of all items in the response should be a number lesser than {int}', function (key: string, value: string) {
    const responseData = this.latestResponse.data

    responseData.forEach((item: any) => {
        assert.equal(parseInt(item[key]) < parseInt(value), true, `"${item[key]}" is not lesser than "${value}"`)
    })
})
