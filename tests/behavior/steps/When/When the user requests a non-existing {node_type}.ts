import {When, world} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests a non-existing {string}',
    async (nodeType: string) => {
        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}/-42`

        const response = await performApiRequest(path, 'GET')
        world.rememberResponse(response)
    })
