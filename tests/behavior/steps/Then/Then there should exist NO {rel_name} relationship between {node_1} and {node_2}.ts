import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {dasherize} from "inflection"
import {NodeManager} from "../../lib/NodeManager"
import {performApiRequest} from "../../lib/performApiRequest"

Then('there should exist NO {string} relationship between {string} and {string}',
    async (relationshipName: string, startNodeLabel: string, endNodeLabel: string) => {
        const startNode = NodeManager.getNodeByLabel(startNodeLabel)
        const endNode = NodeManager.getNodeByLabel(endNodeLabel)
        const nodePath = getBasePathFragmentForNodeType(startNode.node_type)
        const path = `/${nodePath}/${startNode.fields.id}/${dasherize(relationshipName)}`

        const response = await performApiRequest(path, 'GET')

        assert.equal(response.status_code, 200)

        if (Array.isArray(response.body.data)) {
            assert.fail('NOT IMPLEMENTED') // TODO
        } else if ('relationship_partner' in response.body.data) {
            assert.notEqual(response.body.data.relationship_partner.data.id, endNode.fields.id)
        } else {
            assert.ok(true)
        }
    })
