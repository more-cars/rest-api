import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {kebabCase} from "change-case"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should return a collection with {int} {string} relationships',
    (amount: number, relationshipName: string) => {
        const response = ResponseManager.getPreviousResponse()
        const relationships = response.body.data

        assert.equal(relationships.length, amount)

        relationships.forEach((relationship: any) => {
            assert.equal(relationship.data.relationship_name, kebabCase(relationshipName))
        })
    })
