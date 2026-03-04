import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('all items in the response should contain an ID lesser than {int}',
    (expectedId: number) => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data

        data.forEach((item: any) => {
            assert.equal(parseInt(item.id) < expectedId, true, `"Expected ${item.id}" to be lesser than "${expectedId}"`)
        })
    })
