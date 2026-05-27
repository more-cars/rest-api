import {When} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests a {string} collection, sorted by {string}',
    async (nodeType: string, sortByProperty: string) => {
        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}?sort_by_property=${sortByProperty}`

        await performApiRequest(path, 'GET')
    })
