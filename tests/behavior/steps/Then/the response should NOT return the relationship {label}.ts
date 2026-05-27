import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"
import {RelationshipManager} from "../../lib/RelationshipManager"
import type {RelationResponse} from "../../../../src/controllers/types/RelationResponse"

Then('the response should NOT return the relationship {string}',
    (label: string) => {
        const rememberedRelationship = RelationshipManager.getRelationshipByLabel(label)
        const response = ResponseManager.getPreviousResponse()
        const returnedRelationship = response.body as RelationResponse

        assert.notEqual(
            rememberedRelationship.data?.id,
            returnedRelationship.data?.id,
        )
    })
