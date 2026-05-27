import {When} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests a {string} collection, sorted {string} by {string}',
    async (nodeTypeName: string, sortDirection: string, sortByProperty: string) => {
        const nodePath = getBasePathFragmentForNodeType(nodeTypeName)
        const path = `/${nodePath}?sort_by_property=${sortByProperty}&sort_direction=${sortDirection}`

        await performApiRequest(path, 'GET')
    })
