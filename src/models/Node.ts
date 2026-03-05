import {fetchNodeById} from "../db/nodes/fetchNodeById"
import {NodeNotFoundError} from "./types/NodeNotFoundError"
import {convertDbNodeToModelNode} from "./node-types/convertDbNodeToModelNode"
import type {ModelNodeType} from "./types/ModelNodeType"
import {fetchNodeCountByNodeType} from "../db/nodes/fetchNodeCountByNodeType"
import {mapModelNodeTypeToDbNodeType} from "./node-types/mapModelNodeTypeToDbNodeType"
import type {NodeCollectionConstraints} from "./types/NodeCollectionConstraints"
import {getDbQueryCollectionParams} from "../db/nodes/getDbQueryCollectionParams"

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
    }
}
