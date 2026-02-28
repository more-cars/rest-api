import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should return an empty body',
    () => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body

        assert.equal(data, "")
    })
