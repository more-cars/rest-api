import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {NodeManager} from "../../lib/NodeManager"
import {ResponseManager} from "../../lib/ResponseManager"
import type {NodeResponse} from "../../../../src/controllers/types/NodeResponse"
import {getResponseNodeSchema} from "../../../_toolbox/schemas/response/getResponseNodeSchema"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {validateJson} from "../../../_toolbox/validateJson"

Then('the response should return a variation of {string} {string}',
    (nodeType: string, label: string) => {
        const originalNode = NodeManager.getNodeByLabel(label)
        const response = ResponseManager.getPreviousResponse()
        const nodeVariant = response.body as NodeResponse
        const {id, ...originalData} = originalNode.fields
        const variantData = nodeVariant.attributes

        const schema = getResponseNodeSchema(getBasePathFragmentForNodeType(nodeType) as ControllerNodeType)
        assert.ok(validateJson(nodeVariant, schema))
        assert.equal(id, nodeVariant.id)
        assert.notEqual(JSON.stringify(originalData), JSON.stringify(variantData))
    })
