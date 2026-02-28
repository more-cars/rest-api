import {When, world} from "@cucumber/cucumber"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {convertStringToNodeType} from "../../lib/convertStringToNodeType"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"
import {NodeManager} from "../../lib/NodeManager"

When('the user creates a {string} {string}',
    async (nodeType: string, label: string) => {
        const data = getFakeNode(convertStringToNodeType(nodeType)).dbInput
        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}`

        const response = await performApiRequest(path, 'POST', data)
        world.rememberResponse(response)
        NodeManager.cacheNode(nodeType, label, response.body.data)
    })
