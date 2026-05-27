import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should contain an error message', function () {
    const response = ResponseManager.getPreviousResponse()
    const data = response.body

    assert(data.errors[0].status, 'Error message contains no status code')
    assert(data.errors[0].title, 'Error message contains no title')
    assert(data.errors[0].detail, 'Error message contains no detail information')
})
