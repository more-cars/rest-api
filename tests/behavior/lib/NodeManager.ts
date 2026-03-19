import type {ControllerNode} from "../../../src/controllers/types/ControllerNode"
import {getFakeNode} from "../../_toolbox/fixtures/nodes/getFakeNode"
import {getBasePathFragmentForNodeType} from "./getBasePathFragmentForNodeType"
import {performApiRequest} from "./performApiRequest"
import {convertStringToControllerNodeType, convertStringToNodeType} from "../../_toolbox/convertStringToNodeType"

const nodeCache = new Map<string, ControllerNode>()
const nodeCollectionCache = new Map<string, ControllerNode[]>()

export const NodeManager = {
    async createNode(nodeType: string, label: string, data?: any) {
        const inputData = data || getFakeNode(convertStringToNodeType(nodeType)).dbInput
        const nodeBasePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodeBasePath}`

        const response = await performApiRequest(path, 'POST', inputData)

        const node: ControllerNode = {
            node_type: convertStringToControllerNodeType(nodeType),
            fields: Object.assign({}, response.body.attributes, {id: response.body.id}),
        }

        nodeCache.set(label, node)

        return node
    },

    cacheNode(node: ControllerNode, label: string) {
        nodeCache.set(label, node)
    },

    getNodeByLabel(label: string) {
        const node = nodeCache.get(label)

        if (!node) {
            throw new Error(`No node found for label ${label}`)
        }

        return node
    },

    cacheNodeCollection(nodes: ControllerNode[], label: string) {
        nodeCollectionCache.set(label, nodes)
    },

    getNodeCollectionByLabel(label: string) {
        const nodes = nodeCollectionCache.get(label)

        if (!nodes) {
            throw new Error(`No node collection found for label ${label}`)
        }

        return nodes
    }
}
