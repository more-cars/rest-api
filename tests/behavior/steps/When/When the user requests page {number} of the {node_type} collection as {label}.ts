import {When} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"
import {NodeManager} from "../../lib/NodeManager"
import {convertNodeResponseToNode} from "../../lib/convertNodeResponseToNode"

When('the user requests page {int} of the {string} collection as {string}',
    async (page: number, nodeType: string, collectionLabel: string) => {
        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}?page=${page}`

        const response = await performApiRequest(path, 'GET')
        NodeManager.cacheNodeCollection(response.body.data.map((node: any) => convertNodeResponseToNode(node)), collectionLabel)
    })
