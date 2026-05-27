import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {NodeManager} from "../../lib/NodeManager"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

Then('the {string} {string} should not exist anymore',
    async (nodeType: string, label: string) => {
        const node = NodeManager.getNodeByLabel(label)
        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}/${node.fields.id}`

        const response = await performApiRequest(path, 'GET')

        assert.equal(response.status_code, 404)
    })
