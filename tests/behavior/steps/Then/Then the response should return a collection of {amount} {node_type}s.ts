import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {getNodeSchema} from "../../../_toolbox/schemas/controller/getNodeSchema"
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import {validateJson} from "../../../_toolbox/validateJson"

Then('the response should return a collection of {int} {string}s',
    (amount: number, nodeType: string) => {
        assert.equal(world.recallResponse().data.data.length, amount)

        const schema = getNodeSchema(nodeType.toLowerCase() as NodeTypeEnum)

        world.recallResponse().data.data.forEach((item: any) => {
            assert.ok(validateJson(item.data, schema))
        })
    })
