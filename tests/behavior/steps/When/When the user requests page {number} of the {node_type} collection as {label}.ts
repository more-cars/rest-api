import {When, world} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests page {int} of the {string} collection as {string}',
    async (page: number, nodeType: string, collectionLabel: string) => {
        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}?page=${page}`

        const response = await performApiRequest(path, 'GET')
        world.rememberNodeCollection(response.body.data, collectionLabel, nodeType.toLowerCase())
        world.rememberResponse(response)
    })
