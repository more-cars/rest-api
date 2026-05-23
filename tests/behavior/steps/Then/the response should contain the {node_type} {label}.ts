import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {NodeManager} from "../../lib/NodeManager"
import {ResponseManager} from "../../lib/ResponseManager"
import type {RelationResponseItem} from "../../../../src/controllers/types/RelationResponseItem"

Then('the response should contain the node {string}',
    (label: string) => {
        const expectedNode = NodeManager.getNodeByLabel(label)
        const response = ResponseManager.getPreviousResponse()
        const items: RelationResponseItem[] = response.body.data
        const partnerNodeIds = items.map(item => item.id)

        const match = partnerNodeIds.find(nodeId => nodeId === expectedNode.fields.id)

        assert.ok(match, `Expected the response to contain node "${label}".`)
    })
