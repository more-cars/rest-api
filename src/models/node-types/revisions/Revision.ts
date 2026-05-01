import type {CreateRevisionInput} from "./types/CreateRevisionInput"
import type {RevisionNode} from "./types/RevisionNode"
import {convertInputData} from "./create/convertInputData"
import {createNeo4jNode} from "../../../db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../db/types/DbNodeType"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/revisions/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"

export const Revision = {
    async create(data: CreateRevisionInput): Promise<RevisionNode> {
        const input = convertInputData(data)
        const result = await createNeo4jNode(DbNodeType.Revision, input)

        return convertDbNodeToModelNode(result) as RevisionNode
    },

    async findById(id: number): Promise<RevisionNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as RevisionNode
    },
}
