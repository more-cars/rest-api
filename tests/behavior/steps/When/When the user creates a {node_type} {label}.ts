import {When, world} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {convertStringToNodeType} from "../../lib/convertStringToNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user creates a {string} {string}',
    async (nodeType: string, label: string) => {
        const data = getFakeNode(convertStringToNodeType(nodeType)).dbInput
        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}`

        const response = await performApiRequest(path, 'POST', data)
        world.rememberResponse(response)
        world.rememberNode(response.body.data, label, nodeType.toLowerCase())
    })
