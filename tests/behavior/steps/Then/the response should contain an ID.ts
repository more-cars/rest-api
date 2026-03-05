import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should contain an ID',
    () => {
        const response = ResponseManager.getPreviousResponse()

        assert.equal(parseInt(response.body.id) > 0, true)
    })
