import {When, world} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {convertStringToNodeType} from "../../lib/convertStringToNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user creates a(n) {string}',
    async (nodeType: string) => {
        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const data = getFakeNode(convertStringToNodeType(nodeType)).dbInput
        const path = `/${nodePath}`

        const response = await performApiRequest(path, 'POST', data)
        world.rememberResponse(response)
    })
