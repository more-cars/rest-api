import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {getResponseNodeSchema} from "../../../_toolbox/schemas/response/getResponseNodeSchema"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {validateJson} from "../../../_toolbox/validateJson"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should return a collection of {int} {string}s',
    (amount: number, nodeType: string) => {
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data
        const schema = getResponseNodeSchema(getBasePathFragmentForNodeType(nodeType) as ControllerNodeType)

        assert.equal(data.length, amount)

        data.forEach((item: any) => {
            assert.ok(validateJson(item, schema))
        })
    })
