import {performApiRequest} from "./performApiRequest"
import {world} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "./getBasePathFragmentForNodeType"
import {getFakeNode} from "../../_toolbox/fixtures/nodes/getFakeNode"
import {convertStringToControllerNodeType, convertStringToNodeType} from "./convertStringToNodeType"
import type {ControllerNode} from "../../../src/controllers/types/ControllerNode"

const nodeCache = new Map<string, ControllerNode>()

export const NodeManager = {
    async createNode(nodeType: string, label: string, data?: any) {
        const inputData = data || getFakeNode(convertStringToNodeType(nodeType)).dbInput
        const nodeBasePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodeBasePath}`

        const response = await performApiRequest(path, 'POST', inputData)
        world.rememberResponse(response)
        nodeCache.set(label, {
            node_type: convertStringToControllerNodeType(nodeType),
            fields: response.body.data,
        })
    },

    getNodeByLabel(label: string) {
        const node = nodeCache.get(label)

        if (!node) {
            throw new Error(`No node found for label ${label}`)
        }

        return node
    },

    cacheNode(nodeType: string, label: string, data: any) {
        nodeCache.set(label, {
            node_type: convertStringToControllerNodeType(nodeType),
            fields: data,
        })
    }
}
