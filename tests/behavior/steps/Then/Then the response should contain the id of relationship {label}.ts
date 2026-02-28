import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should contain the id of relationship {string}',
    (label: string) => {
        const rememberedRelationship = world.recallRelationship(label)
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data

        assert.equal(
            data.relationship_id,
            rememberedRelationship.relationship_id,
            `Relationship ID "${data.relationship_id}" was returned, 
        but expected "${rememberedRelationship.relationship_id}".`
        )
    })
