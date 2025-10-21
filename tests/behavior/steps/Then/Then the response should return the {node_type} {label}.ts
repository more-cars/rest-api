import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {BaseNode} from "../../../../src/db/types/BaseNode"
import {getNodeSchema} from "../../../_toolbox/schemas/controller/getNodeSchema"
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import {validateJson} from "../../../_toolbox/validateJson"

Then('the response should return the {string} {string}',
    (nodeType: string, label: string) => {
        const expectedNode: BaseNode = world.recallNode(label).data
        const actualNode = world.recallResponse().data.data
        const schema = getNodeSchema(nodeType.toLowerCase() as NodeTypeEnum)

        assert.ok(validateJson(actualNode, schema))

        for (const expectedProperty in expectedNode) {
            // @ts-expect-error TS7053
            assert.equal(actualNode[expectedProperty], expectedNode[expectedProperty])
        }
    })
