import {When, world} from "@cucumber/cucumber"
import {NodeManager} from "../../lib/NodeManager"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests the {string} {string}',
    async (nodeType: string, label: string) => {
        const node = NodeManager.getNodeByLabel(label)
        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}/${node.fields.id}`

        const response = await performApiRequest(path, 'GET')
        world.rememberResponse(response)
    })
