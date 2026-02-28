import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should contain an error message', function () {
    const response = ResponseManager.getPreviousResponse()
    const data = response.body

    assert(typeof data === "string", `"error message is not a string`)
})
