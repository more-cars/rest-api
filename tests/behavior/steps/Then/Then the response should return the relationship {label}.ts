import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should return the relationship {string}',
    (label: string) => {
        const expectedRelationship = world.recallRelationship(label)
        const response = world.recallResponse() as ApiResponse
        const actualRelationship = response.body.data

        if ('start_node_id' in expectedRelationship) { // relationship was created via db seeder
            assert.equal(expectedRelationship.relationship_id, actualRelationship.relationship_id)
        } else {
            assert.deepStrictEqual( // relationship was created via api
                actualRelationship,
                expectedRelationship,
            )
        }
    })
