import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should contain the id of relationship {string}',
    (label: string) => {
        const rememberedRelationship = world.recallRelationship(label)

        assert.equal(
            world.recallResponse().data.data.relationship_id,
            rememberedRelationship.relationship_id,
            `Relationship ID "${world.recallResponse().data.data.relationship_id}" was returned, 
        but expected "${rememberedRelationship.relationship_id}".`
        )
    })
