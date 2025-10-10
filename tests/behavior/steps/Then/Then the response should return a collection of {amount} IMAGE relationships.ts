import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {RelationshipSchema} from "../../../_toolbox/schemas/RelationshipSchema"
import {validateJson} from "../../../_toolbox/validateJson"
import type {RelationshipResponse} from "../../../../src/controllers/relationships/types/RelationshipResponse"

Then('the response should return a collection of {int} IMAGE relationships',
    (amount: number) => {
        const relationships: RelationshipResponse[] = world.recallResponse().data.data

        assert.equal(relationships.length, amount)

        relationships.forEach(relationship => {
            assert.ok(validateJson(relationship.data, RelationshipSchema))
            assert.equal(relationship.data.relationship_partner.node_type, 'image')
        })
    })
