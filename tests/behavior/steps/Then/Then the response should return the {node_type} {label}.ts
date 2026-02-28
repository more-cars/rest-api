import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {getResponseNodeSchema} from "../../../_toolbox/schemas/response/getResponseNodeSchema"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {validateJson} from "../../../_toolbox/validateJson"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should return the {string} {string}',
    (nodeType: string, label: string) => {
        const expectedNode: DbNode = world.recallNode(label).data
        const response = world.recallResponse() as ApiResponse
        const actualNode = response.body

        const schema = getResponseNodeSchema(getBasePathFragmentForNodeType(nodeType) as ControllerNodeType)

        assert.ok(validateJson(actualNode, schema))

        for (const expectedProperty in expectedNode.properties) {
            // @ts-expect-error TS7053
            assert.equal(actualNode[expectedProperty], expectedNode[expectedProperty])
        }
    })
