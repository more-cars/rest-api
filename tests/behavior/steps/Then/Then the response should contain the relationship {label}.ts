import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {RelationshipManager} from "../../lib/RelationshipManager"
import {ResponseManager} from "../../lib/ResponseManager"
import type {RelationResponse} from "../../../../src/controllers/types/RelationResponse"

Then('the response should contain the relationship {string}',
    (label: string) => {
        const rememberedRelationship = RelationshipManager.getRelationshipByLabel(label)
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data as RelationResponse[]

        const found = data.find((relationship) => {
            return JSON.stringify(relationship) === JSON.stringify(rememberedRelationship)
        })

        assert.ok(found, `Relationship #"${rememberedRelationship.data.relationship_id}" not found in response.`)
    })
