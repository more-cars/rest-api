import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"
import {NodeManager} from "../../lib/NodeManager"

Then('the response should contain {string} {string} at position {int}',
    (nodeType: string, label: string, position: number) => {
        const response = ResponseManager.getPreviousResponse()
        const expectedNode = NodeManager.getNodeByLabel(label)

        assert.equal(response.body.data[position - 1].id, expectedNode.fields.id)
    })
