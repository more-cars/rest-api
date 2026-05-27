import {When} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"
import {NodeManager} from "../../lib/NodeManager"

When('the user updates the node {string}',
    async (nodeLabel: string) => {
        const node = NodeManager.getNodeByLabel(nodeLabel)
        const nodePath = getBasePathFragmentForNodeType(node.node_type)
        const path = `/${nodePath}/${node.fields.id}`

        await performApiRequest(path, 'PATCH', {})
    })
