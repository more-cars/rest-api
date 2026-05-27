import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should return an empty list',
    () => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data

        assert.equal(data.length, 0)
    })
