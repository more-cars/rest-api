import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {NodeManager} from "../../lib/NodeManager"
import type {ApiResponse} from "../../lib/ApiResponse"
import {getResponseNodeSchema} from "../../../_toolbox/schemas/response/getResponseNodeSchema"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {validateJson} from "../../../_toolbox/validateJson"

Then('the response should return the {string} {string}',
    (nodeType: string, label: string) => {
        const expectedNode = NodeManager.getNodeByLabel(label)
        const response = world.recallResponse() as ApiResponse
        const actualNode = response.body

        const schema = getResponseNodeSchema(getBasePathFragmentForNodeType(nodeType) as ControllerNodeType)

        assert.ok(validateJson(actualNode, schema))

        for (const expectedProperty in expectedNode.fields) {
            // @ts-expect-error TS7053
            assert.equal(actualNode[expectedProperty], expectedNode[expectedProperty])
        }
    })
