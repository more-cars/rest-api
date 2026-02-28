import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should return with status code {int}',
    (statusCode: number) => {
        const response = ResponseManager.getPreviousResponse()

        assert.equal(response.status_code, statusCode)
    })
