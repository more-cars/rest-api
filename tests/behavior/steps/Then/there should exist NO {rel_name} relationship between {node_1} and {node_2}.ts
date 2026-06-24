import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {dasherize} from "inflection"
import {NodeManager} from "../../lib/NodeManager"
import {performApiRequest} from "../../lib/performApiRequest"

Then('there should exist NO {string} relationship between {string} and {string}',
    async (relationshipName: string, startNodeLabel: string, _endNodeLabel: string) => {
        const startNode = NodeManager.getNodeByLabel(startNodeLabel)
        const nodePath = getBasePathFragmentForNodeType(startNode.node_type)
        const path = `/${nodePath}/${startNode.fields.id}/${dasherize(relationshipName)}`

        const response = await performApiRequest(path, 'GET')

        assert.equal(response.status_code, 200)

        if (response.body.data === null) {
            assert.equal(response.body.data, null, 'unexpected relationship data')
        }
    })
