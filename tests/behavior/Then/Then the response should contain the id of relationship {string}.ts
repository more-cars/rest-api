import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {BrandHasCarModelRelationship} from "../../../src/types/brands/BrandHasCarModelRelationship"

Then('the response should contain the id of relationship {string}', function (relationshipLabel: string) {
    const rememberedRelationship: BrandHasCarModelRelationship = this.relationship[relationshipLabel]

    assert.equal(
        this.latestResponse.data['relationship_id'],
        rememberedRelationship.relationship_id,
        `Relationship ID "${this.latestResponse.data['relationship_id']}" was returned, 
        but expected "${rememberedRelationship.relationship_id}".`
    )
})
