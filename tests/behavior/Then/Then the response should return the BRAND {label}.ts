import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {BrandNode} from "../../../src/types/brands/BrandNode"
import {BrandSchema} from "../../_schemas/BrandSchema"
import {validateJson} from "../../_helpers/validateJson"

Then('the response should return the brand {string}', function (label: string) {
    const expectedNode: BrandNode = this.brand[label]
    const actualNode: BrandNode = this.latestResponse.data

    assert.ok(validateJson(actualNode, BrandSchema))

    for (const expectedProperty in expectedNode) {
        // @ts-expect-error TS7053
        assert.equal(actualNode[expectedProperty], expectedNode[expectedProperty])
    }
})
