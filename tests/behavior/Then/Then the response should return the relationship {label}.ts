import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {BrandHasCarModelRelationship} from "../../../src/types/brands/BrandHasCarModelRelationship"

Then('the response should return the relationship {string}',
    function (label: string) {
        const expectedRelationship: BrandHasCarModelRelationship = this.relationship[label]
        const actualRelationship = this.latestResponse.data

        // TODO validating the whole response object
        assert.equal(
            actualRelationship.relationship_id,
            expectedRelationship.relationship_id,
        )
    })
