import {Then} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should return a collection with {int} relationships',
    function (amount: number) {
        const relationships = this.latestResponse.data

        assert.equal(relationships.length, amount)

        relationships.forEach((relationship: any) => {
            assert("relationship_id" in relationship, `relationship ID not found in the response`)
        })
    })
