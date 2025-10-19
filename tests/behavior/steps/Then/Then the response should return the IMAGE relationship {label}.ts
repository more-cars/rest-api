import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {ImageBelongsToNodeRelationship} from "../../../../src/models/images/types/ImageBelongsToNodeRelationship"
import {RelationshipSchema} from "../../../_toolbox/schemas/controller/RelationshipSchema"
import {validateJson} from "../../../_toolbox/validateJson"
import type {RelationshipResponse} from "../../../../src/controllers/relationships/types/RelationshipResponse"

Then('the response should return the IMAGE relationship {string}',
    (label: string) => {
        const expectedRelationship: ImageBelongsToNodeRelationship = world.recallRelationship(label)
        const actualRelationship: RelationshipResponse = world.recallResponse().data

        assert.ok(validateJson(actualRelationship.data, RelationshipSchema))
        assert.equal(actualRelationship.data.relationship_id, expectedRelationship.relationship_id)
    })
