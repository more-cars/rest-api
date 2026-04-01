import {fetchNodeById} from "../db/nodes/fetchNodeById"
import {NodeNotFoundError} from "./types/NodeNotFoundError"
import {convertDbNodeToModelNode} from "./node-types/convertDbNodeToModelNode"
import type {ModelNodeType} from "./types/ModelNodeType"
import {fetchNodeCountByNodeType} from "../db/nodes/fetchNodeCountByNodeType"
import {mapModelNodeTypeToDbNodeType} from "./node-types/mapModelNodeTypeToDbNodeType"
import type {NodeCollectionConstraints} from "./types/NodeCollectionConstraints"
import {getDbQueryCollectionParams} from "../db/nodes/getDbQueryCollectionParams"
import {fetchNodesPrimeImage} from "../db/nodes/fetchNodesPrimeImage"
import type {ImageNode} from "./node-types/images/types/ImageNode"

export const Node = {
    async findById(id: number) {
        const dbNode = await fetchNodeById(id)

        if (!dbNode) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(dbNode)
    },

    async getTotalAmount(nodeType: ModelNodeType, constraints: NodeCollectionConstraints = {}) {
        const dbParams = getDbQueryCollectionParams(constraints)

        return await fetchNodeCountByNodeType(mapModelNodeTypeToDbNodeType(nodeType), dbParams)
    },

    async findPrimeImages(ids: number[]) {
        const nodes: ImageNode[] = []
        const dbNodes = await fetchNodesPrimeImage(ids)

        dbNodes.forEach(dbNode => {
            nodes.push(convertDbNodeToModelNode(dbNode) as ImageNode)
        })

        return nodes
    },
}
