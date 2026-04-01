import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {NodeManager} from "../../lib/NodeManager"
import {ResponseManager} from "../../lib/ResponseManager"
import type {NodeResponse} from "../../../../src/controllers/types/NodeResponse"

Then('the response should NOT contain the node {string}',
    (label: string) => {
        const expectedNode = NodeManager.getNodeByLabel(label)
        const response = ResponseManager.getPreviousResponse()
        const actualNodes = response.body.data

        const match = actualNodes.find((node: NodeResponse) => Number(node.id) === expectedNode.fields.id)

        assert.ok(!match, `Expected the response to NOT contain node "${label}".`)
    })
