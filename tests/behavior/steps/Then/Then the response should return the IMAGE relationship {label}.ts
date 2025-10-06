import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {ImageBelongsToNodeRelationship} from "../../../../src/models/images/types/ImageBelongsToNodeRelationship"
import {ImageBelongsToNodeSchema} from "../../../_toolbox/schemas/ImageBelongsToNodeSchema"
import {validateJson} from "../../../_toolbox/validateJson"

Then('the response should return the IMAGE relationship {string}',
    (label: string) => {
        const expectedRelationship: ImageBelongsToNodeRelationship = world.recallRelationship(label)
        const actualRelationship: ImageBelongsToNodeRelationship = world.recallResponse().data

        assert.ok(validateJson(actualRelationship, ImageBelongsToNodeSchema))

        for (const expectedProperty in expectedRelationship) {
            // @ts-expect-error TS7053
            assert.equal(actualRelationship[expectedProperty], expectedRelationship[expectedProperty])
        }
    })
