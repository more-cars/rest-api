import type {RevisionInput} from "./types/RevisionInput"
import type {RevisionNode} from "./types/RevisionNode"
import {convertInputData} from "./create/convertInputData"
import {createDbNode} from "../../../db/nodes/createDbNode"
import {DbNodeType} from "../../../db/types/DbNodeType"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/revisions/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {fetchNodesFromDb} from "../../../db/nodes/fetchNodesFromDb"
import {getDbQueryCollectionParams} from "../../../db/nodes/getDbQueryCollectionParams"

export const Revision = {
    async create(data: RevisionInput): Promise<RevisionNode> {
        const input = convertInputData(data)
        const result = await createDbNode(DbNodeType.Revision, input)

        return convertDbNodeToModelNode(result) as RevisionNode
    },

    async findById(id: number): Promise<RevisionNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as RevisionNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<RevisionNode[]> {
        const nodes: RevisionNode[] = []
        const nodesDb = await fetchNodesFromDb(DbNodeType.Revision, getDbQueryCollectionParams(options))

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as RevisionNode)
        })

        return nodes
    },
}
