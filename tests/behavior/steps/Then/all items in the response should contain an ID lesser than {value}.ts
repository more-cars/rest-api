import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"
import type {NodeResponse} from "../../../../src/controllers/types/NodeResponse"

Then('all items in the response should contain an ID lesser than {int}',
    (expectedId: number) => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data as NodeResponse[]

        data.forEach((item) => {
            assert.equal(item.id < expectedId, true, `"Expected ${item.id}" to be lesser than "${expectedId}"`)
        })
    })
