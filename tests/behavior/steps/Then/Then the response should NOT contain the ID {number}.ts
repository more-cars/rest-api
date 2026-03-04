import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should NOT contain the ID {int}',
    (id: number) => {
        const response = ResponseManager.getPreviousResponse()
        // @ts-ignore
        assert.notEqual(response.id, id, `Expected the node ID to not have the value "${id}"`)
    })
