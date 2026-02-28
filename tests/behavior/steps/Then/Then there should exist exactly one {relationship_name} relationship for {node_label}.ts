import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {dasherize} from "inflection"
import {NodeManager} from "../../lib/NodeManager"
import {performApiRequest} from "../../lib/performApiRequest"

Then('there should exist exactly one {string} relationship for {string}',
    async (relationshipName: string, nodeLabel: string) => {
        const startNode = NodeManager.getNodeByLabel(nodeLabel)
        const nodePath = getBasePathFragmentForNodeType(startNode.node_type)
        const path = `/${nodePath}/${startNode.fields.id}/${dasherize(relationshipName)}`

        const response = await performApiRequest(path, 'GET')

        assert.equal(Array.isArray(response.body.data), false)
        assert(response.body.data.relationship_id !== undefined)
    })
