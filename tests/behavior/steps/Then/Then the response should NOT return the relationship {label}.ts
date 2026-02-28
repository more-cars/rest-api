import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"
import {RelationshipManager} from "../../lib/RelationshipManager"

Then('the response should NOT return the relationship {string}',
    (label: string) => {
        const rememberedRelationship = RelationshipManager.getRelationshipByLabel(label)
        const response = ResponseManager.getPreviousResponse()
        const returnedRelationship = response.body

        assert.notDeepStrictEqual(
            rememberedRelationship.data.relationship_id,
            returnedRelationship.data.relationship_id,
        )
    })
