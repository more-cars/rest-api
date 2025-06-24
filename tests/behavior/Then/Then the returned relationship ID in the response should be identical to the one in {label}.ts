import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {BaseRelationship} from "../../../src/db/types/BaseRelationship"

Then('the returned relationship ID in the response should be identical to the one in {string}', function (relationshipLabel: string) {
    const rememberedRelationship: BaseRelationship = this.relationship[relationshipLabel]

    assert.equal(
        this.latestResponse.data['relationship_id'],
        rememberedRelationship.relationship_id,
        `Relationship ID "${this.latestResponse.data['relationship_id']}" was returned, 
        but expected "${rememberedRelationship.relationship_id}".`
    )
})
