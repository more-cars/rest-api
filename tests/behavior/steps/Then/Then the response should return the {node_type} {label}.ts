import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {DbNode} from "../../../../src/db/types/DbNode"
import {getSchemaForNodeType} from "../../../_toolbox/schemas/model/getSchemaForNodeType"
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import {validateJson} from "../../../_toolbox/validateJson"

Then('the response should return the {string} {string}',
    (nodeType: string, label: string) => {
        const expectedNode: DbNode = world.recallNode(label).data
        const actualNode = world.recallResponse().data.data
        const schema = getSchemaForNodeType(nodeType.toLowerCase() as NodeTypeEnum)

        assert.ok(validateJson(actualNode, schema))

        for (const expectedProperty in expectedNode) {
            // @ts-expect-error TS7053
            assert.equal(actualNode[expectedProperty], expectedNode[expectedProperty])
        }
    })
