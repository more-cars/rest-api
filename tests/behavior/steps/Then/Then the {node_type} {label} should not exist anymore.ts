import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

Then('the {string} {string} should not exist anymore',
    async (nodeType: string, label: string) => {
        const node = world.recallNode(label).data
        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}/${node.id}`

        const response = await performApiRequest(path, 'GET')

        assert.equal(response.status_code, 404)
    })
