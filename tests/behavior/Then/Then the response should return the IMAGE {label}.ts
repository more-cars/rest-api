import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ImageNode} from "../../../src/models/images/types/ImageNode"
import {ImageSchema} from "../../_toolbox/schemas/ImageSchema"
import {validateJson} from "../../_toolbox/validateJson"

Then('the response should return the IMAGE {string}',
    function (label: string) {
        const expectedNode: ImageNode = this.image[label]
        const actualNode: ImageNode = this.latestResponse.data

        assert.ok(validateJson(actualNode, ImageSchema))

        for (const expectedProperty in expectedNode) {
            // @ts-expect-error TS7053
            assert.equal(actualNode[expectedProperty], expectedNode[expectedProperty])
        }
    })
