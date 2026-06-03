import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"
import type {RelationResponseItem} from "../../../../src/controllers/types/RelationResponseItem"

Then('the id of all items in the response should be {int}',
    (value: number) => {
        const response = ResponseManager.getPreviousResponse()
        const items: RelationResponseItem[] = response.body.data

        items.forEach(item => {
            assert.equal(item.id === value, true, `"${item.id}" is not "${value}"`)
        })
    })
