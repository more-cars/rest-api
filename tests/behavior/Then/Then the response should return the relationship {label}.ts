import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {BrandHasCarModelRelationship} from "../../../src/models/brands/types/BrandHasCarModelRelationship"

Then('the response should return the relationship {string}',
    (label: string) => {
        const expectedRelationship: BrandHasCarModelRelationship = world.recallRelationship(label)
        const actualRelationship = world.recallResponse().data

        assert.deepStrictEqual(
            actualRelationship,
            expectedRelationship,
        )
    })
