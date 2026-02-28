import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the property {string} of all items in the response should be a number lesser than {int}',
    (key: string, value: string) => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data

        data.forEach((item: any) => {
            assert.equal(parseInt(item.data[key]) < parseInt(value), true, `"${item.data[key]}" is not lesser than "${value}"`)
        })
    })
