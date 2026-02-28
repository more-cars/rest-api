import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {RelationshipManager} from "../../lib/RelationshipManager"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should return the relationship {string}',
    (label: string) => {
        const expectedRelationship = RelationshipManager.getRelationshipByLabel(label)
        const response = ResponseManager.getPreviousResponse()
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
