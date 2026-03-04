import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should contain an ID lesser than {int}',
    (expectedId: number) => {
        const response = ResponseManager.getPreviousResponse()
        const actualId = parseInt(response.body.id)

        assert.equal(actualId < expectedId, true, `"Expected ${actualId}" to be lesser than "${expectedId}"`)
    })
