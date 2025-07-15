import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"
import {BrandSchema} from "../../_toolbox/schemas/BrandSchema"
import {validateJson} from "../../_toolbox/validateJson"

Then('the response should return the BRAND {string}', function (label: string) {
    const expectedNode: BrandNode = this.brand[label]
    const actualNode: BrandNode = this.latestResponse.data

    assert.ok(validateJson(actualNode, BrandSchema))

    for (const expectedProperty in expectedNode) {
        // @ts-expect-error TS7053
        assert.equal(actualNode[expectedProperty], expectedNode[expectedProperty])
    }
})
