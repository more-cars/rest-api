import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {NodeManager} from "../../lib/NodeManager"
import {ResponseManager} from "../../lib/ResponseManager"
import type {RelationResponse} from "../../../../src/controllers/types/RelationResponse"

Then('the response should contain the node {string}',
    (label: string) => {
        const expectedNode = NodeManager.getNodeByLabel(label)
        const response = ResponseManager.getPreviousResponse()
        // @ts-ignore
        const partnerNodeIds: number[] = response.body.data.map((rel: RelationResponse) => Number(rel.data.partner_node.data.id))

        const match = partnerNodeIds.find(nodeId => nodeId === expectedNode.fields.id)

        assert.ok(match, `Expected the response to contain node "${label}".`)
    })
