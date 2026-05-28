import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {NodeManager} from "../../lib/NodeManager"
import {ResponseManager} from "../../lib/ResponseManager"
import {validateJson} from "../../../_toolbox/validateJson"
import type {RelationResponse} from "../../../../src/controllers/types/RelationResponse"
import {RelationshipSchema} from "../../../_toolbox/schemas/response/RelationshipSchema"

Then('the response should return a relationship with {string} {string}',
    (nodeType: string, label: string) => {
        const expectedNode = NodeManager.getNodeByLabel(label)
        const response = ResponseManager.getPreviousResponse()
        const relationResponse = response.body as RelationResponse

        assert.ok(validateJson(relationResponse, RelationshipSchema))

        for (const expectedProperty in expectedNode.fields) {
            if (expectedProperty === 'id') {
                assert.equal(relationResponse.data?.id, expectedNode.fields.id)
            } else {
                assert.equal(relationResponse.data?.attributes[expectedProperty], expectedNode.fields[expectedProperty])
            }
        }
    })
