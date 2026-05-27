import {When} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests a {string} collection, sorted {string}',
    async (nodeType: string, sortDirection: string) => {
        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}?sort_direction=${sortDirection}`

        await performApiRequest(path, 'GET')
    })
