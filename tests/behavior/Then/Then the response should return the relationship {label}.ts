import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {BrandHasCarModelRelationship} from "../../../src/models/brands/types/BrandHasCarModelRelationship"

Then('the response should return the relationship {string}',
    (label: string) => {
        const expectedRelationship: BrandHasCarModelRelationship = world.recallRelationship(label)
        const actualRelationship = world.recallResponse().data

        if ('start_node_id' in expectedRelationship) { // relationship was created via db seeder
            assert.equal(expectedRelationship.relationship_id, actualRelationship.relationship_id)
        } else {
            assert.deepStrictEqual( // relationship was created via api
                actualRelationship,
                expectedRelationship,
            )
        }
    })
