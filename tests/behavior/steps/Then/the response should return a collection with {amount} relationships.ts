import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"
import type {RelationCollectionResponse} from "../../../../src/controllers/types/RelationCollectionResponse"

Then('the response should return a collection with {int} relationships',
    (amount: number) => {
        const response = ResponseManager.getPreviousResponse()
        const relationships = response.body as RelationCollectionResponse

        assert.equal(relationships.data.length, amount)
    })
