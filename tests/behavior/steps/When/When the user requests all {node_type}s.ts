import {When} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

/**
 * @deprecated: use "the user requests a {string} collection" step instead
 */
When('the user requests all {string}s',
    async (nodeType: string) => {
        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}`

        await performApiRequest(path, 'GET')
    })
