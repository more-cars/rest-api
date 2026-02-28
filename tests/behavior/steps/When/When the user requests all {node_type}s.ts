import {When, world} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

/**
 * @deprecated: use "the user requests a {string} collection" step instead
 */
When('the user requests all {string}s',
    async (nodeType: string) => {
        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}`

        const response = await performApiRequest(path, 'GET')
        world.rememberResponse(response)
    })
