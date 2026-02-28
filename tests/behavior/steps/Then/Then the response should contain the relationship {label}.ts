import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {RelationshipManager} from "../../lib/RelationshipManager"
import type {ApiResponse} from "../../lib/ApiResponse"
import type {RelationResponse} from "../../../../src/controllers/types/RelationResponse"

Then('the response should contain the relationship {string}',
    (label: string) => {
        const rememberedRelationship = RelationshipManager.getRelationshipByLabel(label)
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data as RelationResponse[]

        const found = data.find((relationship) => {
            return JSON.stringify(relationship) === JSON.stringify(rememberedRelationship)
        })

        assert.ok(found, `Relationship #"${rememberedRelationship.data.relationship_id}" not found in response.`)
    })
