import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {getResponseNodeSchema} from "../../../_toolbox/schemas/response/getResponseNodeSchema"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {validateJson} from "../../../_toolbox/validateJson"

Then('the response should return a collection of {int} {string}s',
    (amount: number, nodeType: string) => {
        assert.equal(world.recallResponse().data.data.length, amount)

        const schema = getResponseNodeSchema(getBasePathFragmentForNodeType(nodeType as ControllerNodeType) as ControllerNodeType)

        world.recallResponse().data.data.forEach((item: any) => {
            assert.ok(validateJson(item, schema))
        })
    })
