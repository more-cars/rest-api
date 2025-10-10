import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should return a collection with {int} relationships',
    (amount: number) => {
        const relationships = world.recallResponse().data.data

        assert.equal(relationships.length, amount)

        relationships.forEach((relationship: any) => {
            assert("relationship_id" in relationship.data, `relationship ID not found in the response`)
        })
    })
