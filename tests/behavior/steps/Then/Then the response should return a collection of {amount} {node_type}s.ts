import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {getResponseNodeSchema} from "../../../_toolbox/schemas/response/getResponseNodeSchema"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should return a collection of {int} {string}s',
    (amount: number, nodeType: string) => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data
        const schema = getResponseNodeSchema(getBasePathFragmentForNodeType(nodeType) as ControllerNodeType)

        assert.equal(data.length, amount)

        data.forEach((item: any) => {
            // TODO temporarily disabled, because a collection has a different schema than a single node
            // assert.ok(validateJson(item, schema))
        })
    })
