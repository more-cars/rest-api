import {When} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests a {string} collection, filtered by {string} {string}',
    async (nodeType: string, filterByProperty: string, filterValue: string) => {
        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}?filter_by_property=${filterByProperty}&filter_value=${filterValue}`

        await performApiRequest(path, 'GET')
    })
