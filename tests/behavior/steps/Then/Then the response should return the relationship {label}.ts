import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {RelationshipManager} from "../../lib/RelationshipManager"
import {ResponseManager} from "../../lib/ResponseManager"
import type {RelationResponse} from "../../../../src/controllers/types/RelationResponse"

Then('the response should return the relationship {string}',
    (label: string) => {
        const expectedRelationship = RelationshipManager.getRelationshipByLabel(label)
        const response = ResponseManager.getPreviousResponse()
        const actualRelationship = response.body as RelationResponse

        assert.notEqual(actualRelationship.data?.id, null)
        assert.notEqual(actualRelationship.data?.id, undefined)

        assert.equal(
            actualRelationship.data?.id,
            expectedRelationship.data?.id,
        )
    })
