import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {BrandHasCarModelRelationship} from "../../../src/types/brands/BrandHasCarModelRelationship"

Then('the response should contain the the relationship {string}',
    function (label: string) {
        const rememberedRelationship: BrandHasCarModelRelationship = this.relationship[label]
        const responseData = this.latestResponse.data

        const found = responseData.find((relationship: BrandHasCarModelRelationship) => {
            return JSON.stringify(relationship) === JSON.stringify(rememberedRelationship)
        })

        assert.ok(found, `Relationship #"${rememberedRelationship.relationship_id}" not found in response.`)
    })
