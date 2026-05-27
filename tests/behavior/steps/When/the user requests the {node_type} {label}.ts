import {When} from "@cucumber/cucumber"
import {NodeManager} from "../../lib/NodeManager"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests the {string} {string}',
    async (nodeType: string, label: string) => {
        const node = NodeManager.getNodeByLabel(label)
        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}/${node.fields.id}`

        await performApiRequest(path, 'GET')
    })
