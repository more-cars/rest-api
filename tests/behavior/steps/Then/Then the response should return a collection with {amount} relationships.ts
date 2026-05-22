import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"
import type {RelationResponse} from "../../../../src/controllers/types/RelationResponse"

Then('the response should return a collection with {int} relationships',
    (amount: number) => {
        const response = ResponseManager.getPreviousResponse()
        const relationships = response.body.data as RelationResponse[]

        assert.equal(relationships.length, amount)

        relationships.forEach((relationship) => {
            // @ts-ignore
            assert("relationship_id" in relationship.data, `relationship ID not found in the response`)
        })
    })
