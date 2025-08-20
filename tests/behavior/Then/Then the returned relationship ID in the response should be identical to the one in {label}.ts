import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {BaseRelationship} from "../../../src/db/types/BaseRelationship"

Then('the returned relationship ID in the response should be identical to the one in {string}',
    (label: string) => {
        const rememberedRelationship: BaseRelationship = world.recallRelationship(label)

        assert.equal(
            world.recallResponse().data['relationship_id'],
            rememberedRelationship.relationship_id,
            `Relationship ID "${world.recallResponse().data['relationship_id']}" was returned, 
        but expected "${rememberedRelationship.relationship_id}".`
        )
    })
