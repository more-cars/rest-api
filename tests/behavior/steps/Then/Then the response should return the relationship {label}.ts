import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should return the relationship {string}',
    (label: string) => {
        const expectedRelationship = world.recallRelationship(label)
        const actualRelationship = world.recallResponse().data.data

        if ('start_node_id' in expectedRelationship) { // relationship was created via db seeder
            assert.equal(expectedRelationship.relationship_id, actualRelationship.relationship_id)
        } else {
            assert.deepStrictEqual( // relationship was created via api
                actualRelationship,
                expectedRelationship,
            )
        }
    })
