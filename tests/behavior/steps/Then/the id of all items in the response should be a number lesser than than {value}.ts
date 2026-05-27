import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"
import type {RelationResponseItem} from "../../../../src/controllers/types/RelationResponseItem"

Then('the id of all items in the response should be a number lesser than {int}',
    (value: string) => {
        const response = ResponseManager.getPreviousResponse()
        const items: RelationResponseItem[] = response.body.data

        items.forEach(item => {
            assert.equal(item.id < parseInt(value), true, `"${item.id}" is not lesser than "${value}"`)
        })
    })
