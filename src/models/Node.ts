import {fetchNodeById} from "../db/nodes/fetchNodeById"
import {convertDbNodeToModelNode} from "./node-types/convertDbNodeToModelNode"
import {NodeNotFoundError} from "./types/NodeNotFoundError"

export const Node = {
    async findById(id: number) {
        const dbNode = await fetchNodeById(id)

        if (!dbNode) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(dbNode)
    },
}
