import {fetchNodeById} from "../db/nodes/fetchNodeById"
import {NodeNotFoundError} from "./types/NodeNotFoundError"
import {convertDbNodeToModelNode} from "./node-types/convertDbNodeToModelNode"
import type {ModelNodeType} from "./types/ModelNodeType"
import type {NodeCollectionConstraints} from "./types/NodeCollectionConstraints"
import {getDbQueryCollectionParams} from "../db/nodes/getDbQueryCollectionParams"
import {fetchNodeCountByNodeType} from "../db/nodes/fetchNodeCountByNodeType"
import {mapModelNodeTypeToDbNodeType} from "./node-types/mapModelNodeTypeToDbNodeType"
import {fetchNodesPrimeImage} from "../db/nodes/fetchNodesPrimeImage"
import type {Rel} from "./relationships/types/Rel"
import {RelType} from "./relationships/types/RelType"

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
        const dbRelationships = await fetchNodesPrimeImage(ids)

        const rels: Rel[] = []

        for (const dbRelationship of dbRelationships) {
            rels.push({
                id: dbRelationship.id,
                type: RelType.NodeHasPrimeImage,
                origin: convertDbNodeToModelNode(dbRelationship.start_node),
                destination: convertDbNodeToModelNode(dbRelationship.end_node),
                created_at: dbRelationship.created_at,
                updated_at: dbRelationship.updated_at,
            })
        }

        return rels
    },
}
