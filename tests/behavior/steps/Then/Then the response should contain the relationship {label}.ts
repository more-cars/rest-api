import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {RelationResponse} from "../../../../src/controllers/types/RelationResponse"

Then('the response should contain the relationship {string}',
    (label: string) => {
        const rememberedRelationship = world.recallRelationship(label)
        const responseData: RelationResponse[] = world.recallResponse().data.data

        const found = responseData.find((relationship) => {
            return JSON.stringify(relationship.data) === JSON.stringify(rememberedRelationship)
        })

        assert.ok(found, `Relationship #"${rememberedRelationship.relationship_id}" not found in response.`)
    })
