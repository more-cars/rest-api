import {When} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {convertStringToControllerNodeType, convertStringToNodeType} from "../../lib/convertStringToNodeType"
import {performApiRequest} from "../../lib/performApiRequest"
import type {ApiResponse} from "../../lib/ApiResponse"
import {NodeManager} from "../../lib/NodeManager"

When('the user creates a set {string} of {int} {string}s',
    async (label: string, amount: number, nodeType: string) => {
        const nodeResponses: ApiResponse[] = []

        for (let i = 0; i < amount; i++) {
            const nodePath = getBasePathFragmentForNodeType(nodeType)
            const data = getFakeNode(convertStringToNodeType(nodeType)).dbInput
            const path = `/${nodePath}`

            const response = await performApiRequest(path, 'POST', data)
            nodeResponses.push(response)
        }

        const nodeCollection = nodeResponses.map(response => ({
            node_type: convertStringToControllerNodeType(nodeType),
            fields: response.body.data,
        }))

        NodeManager.cacheNodeCollection(nodeCollection, label)
    })
