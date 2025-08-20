import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {BrandHasCarModelRelationship} from "../../../src/models/brands/types/BrandHasCarModelRelationship"

Then('the response should contain the relationship {string}',
    (label: string) => {
        const rememberedRelationship: BrandHasCarModelRelationship = world.recallRelationship(label)
        const responseData = world.recallResponse().data

        const found = responseData.find((relationship: BrandHasCarModelRelationship) => {
            return JSON.stringify(relationship) === JSON.stringify(rememberedRelationship)
        })

        assert.ok(found, `Relationship #"${rememberedRelationship.relationship_id}" not found in response.`)
    })
