import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {ImageBelongsToNodeRelationship} from "../../../src/models/images/types/ImageBelongsToNodeRelationship"
import {ImageBelongsToNodeSchema} from "../../_toolbox/schemas/ImageBelongsToNodeSchema"
import {validateJson} from "../../_toolbox/validateJson"

Then('the response should return a collection of {int} IMAGE relationships',
    (amount: number) => {
        const relationships: Array<ImageBelongsToNodeRelationship> = world.recallResponse().data

        assert.equal(relationships.length, amount)

        relationships.forEach(relationship => {
            assert.ok(validateJson(relationship, ImageBelongsToNodeSchema))
        })
    })
