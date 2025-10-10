import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should return a collection with {int} {string} relationships',
    (amount: number, relationshipName: string) => {
        const relationships = world.recallResponse().data.data

        assert.equal(relationships.length, amount)

        relationships.forEach((relationship: any) => {
            assert.equal(relationship.data.relationship_name, relationshipName)
        })
    })
