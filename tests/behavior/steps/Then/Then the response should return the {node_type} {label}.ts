import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {NodeManager} from "../../lib/NodeManager"
import {ResponseManager} from "../../lib/ResponseManager"
import type {NodeResponse} from "../../../../src/controllers/types/NodeResponse"
import {getResponseNodeSchema} from "../../../_toolbox/schemas/response/getResponseNodeSchema"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {validateJson} from "../../../_toolbox/validateJson"

Then('the response should return the {string} {string}',
    (nodeType: string, label: string) => {
        const expectedNode = NodeManager.getNodeByLabel(label)
        const response = ResponseManager.getPreviousResponse()
        const actualNode = response.body as NodeResponse

        const schema = getResponseNodeSchema(getBasePathFragmentForNodeType(nodeType) as ControllerNodeType)

        assert.ok(validateJson(actualNode, schema))

        for (const expectedProperty in expectedNode.fields) {
            if (expectedProperty === 'id') {
                assert.equal(actualNode.id, expectedNode.fields.id)
            } else {
                // @ts-expect-error TS7053 TS7053
                assert.equal(actualNode.attributes[expectedProperty], expectedNode.fields[expectedProperty])
            }
        }
    })
