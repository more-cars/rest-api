import {When} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests a non-existing {string}',
    async (nodeType: string) => {
        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}/-42`

        await performApiRequest(path, 'GET')
    })
