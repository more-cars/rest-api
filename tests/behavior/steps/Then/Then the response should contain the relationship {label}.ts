import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {RelationshipManager} from "../../lib/RelationshipManager"
import {ResponseManager} from "../../lib/ResponseManager"
import type {RelationResponseItem} from "../../../../src/controllers/types/RelationResponseItem"

Then('the response should contain the relationship {string}',
    (label: string) => {
        const rememberedRelationship = RelationshipManager.getRelationshipByLabel(label)
        const response = ResponseManager.getPreviousResponse()
        const items: RelationResponseItem[] = response.body.data

        const match = items.find(relationship => {
            return JSON.stringify(relationship.attributes) === JSON.stringify(rememberedRelationship.data?.attributes)
        })

        assert.notEqual(match, undefined, `Relationship #"${rememberedRelationship.data?.id}" not found in response.`)
    })
