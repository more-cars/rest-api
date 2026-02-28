import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {RelationResponse} from "../../../../src/controllers/types/RelationResponse"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should contain the relationship {string}',
    (label: string) => {
        const rememberedRelationship = world.recallRelationship(label)
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data as RelationResponse[]

        const found = data.find((relationship) => {
            return JSON.stringify(relationship.data) === JSON.stringify(rememberedRelationship)
        })

        assert.ok(found, `Relationship #"${rememberedRelationship.relationship_id}" not found in response.`)
    })
