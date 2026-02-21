import {fetchNodeById} from "../db/nodes/fetchNodeById"
import {convertDbNodeToModelNode} from "./node-types/convertDbNodeToModelNode"

export const Node = {
    async findById(id: number) {
        const dbNode = await fetchNodeById(id)

        if (!dbNode) {
            return false
        }

        return convertDbNodeToModelNode(dbNode)
    },
}
