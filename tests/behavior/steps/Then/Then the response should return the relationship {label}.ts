import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {RelationshipManager} from "../../lib/RelationshipManager"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should return the relationship {string}',
    (label: string) => {
        const expectedRelationship = RelationshipManager.getRelationshipByLabel(label)
        const response = world.recallResponse() as ApiResponse
        const actualRelationship = response.body

        assert.equal(
            actualRelationship.data.relationship_id,
            expectedRelationship.data.relationship_id,
        )

        assert.deepStrictEqual(
            actualRelationship,
            expectedRelationship,
        )
    })
