import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {NodeManager} from "../../lib/NodeManager"
import {ResponseManager} from "../../lib/ResponseManager"

Then('the response should contain the node {string}',
    (label: string) => {
        const expectedNode = NodeManager.getNodeByLabel(label)
        const response = ResponseManager.getPreviousResponse()
        const partnerNodeIds: number[] = response.body.data.map((rel: any) => Number(rel.data.partner_node.data.id))

        const match = partnerNodeIds.find(nodeId => nodeId === expectedNode.fields.id)

        assert.ok(match, `Expected the response to contain node "${label}".`)
    })
