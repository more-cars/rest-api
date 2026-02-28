import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {RelationshipManager} from "../../lib/RelationshipManager"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should contain the id of relationship {string}',
    (label: string) => {
        const rememberedRelationship = RelationshipManager.getRelationshipByLabel(label)
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data

        assert.equal(
            data.relationship_id,
            rememberedRelationship.data.relationship_id,
            `Relationship ID "${data.relationship_id}" was returned, but expected "${rememberedRelationship.data.relationship_id}".`
        )
    })
