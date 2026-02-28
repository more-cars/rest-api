import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should return a collection with {int} relationships',
    (amount: number) => {
        const response = ResponseManager.getPreviousResponse()
        const relationships = response.body.data

        assert.equal(relationships.length, amount)

        relationships.forEach((relationship: any) => {
            assert("relationship_id" in relationship.data, `relationship ID not found in the response`)
        })
    })
