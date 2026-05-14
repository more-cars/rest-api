import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"
import type {NodeResponse} from "../../../../src/controllers/types/NodeResponse"

Then('all items in the response should contain an ID greater than {int}',
    (expectedId: number) => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data

        data.forEach((item: NodeResponse) => {
            assert.equal(item.id > expectedId, true, `"Expected ${item.id}" to be greater than "${expectedId}"`)
        })
    })
