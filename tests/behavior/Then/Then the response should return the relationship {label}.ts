import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {BrandHasCarModelRelationship} from "../../../src/models/brands/types/BrandHasCarModelRelationship"

Then('the response should return the relationship {string}',
    function (label: string) {
        const expectedRelationship: BrandHasCarModelRelationship = this.relationship[label]
        const actualRelationship = this.latestResponse.data

        assert.deepStrictEqual(
            actualRelationship,
            expectedRelationship,
        )
    })
