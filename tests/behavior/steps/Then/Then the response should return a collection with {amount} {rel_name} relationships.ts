import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"
import type {RelationCollectionResponse} from "../../../../src/controllers/types/RelationCollectionResponse"
import {dasherize} from "inflection"

Then('the response should return a collection with {int} {string} relationships',
    (amount: number, relationshipName: string) => {
        const response = ResponseManager.getPreviousResponse()
        const relationships = response.body as RelationCollectionResponse
        const controllerRelationshipName = dasherize(relationshipName.toLowerCase())

        assert.equal(relationships.data.length, amount)
        assert.ok(relationships.links.self.includes(controllerRelationshipName))
    })
