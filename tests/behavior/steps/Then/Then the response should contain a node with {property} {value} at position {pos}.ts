import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should contain a node with {string} {string} at position {int}',
    (property: string, propertyValue: string, position: number) => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data

        assert.equal(data[position - 1].data[property], propertyValue)
    })
