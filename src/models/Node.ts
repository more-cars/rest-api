import type {DbNode} from "../db/types/DbNode"
import {fetchNodeById} from "../db/nodes/fetchNodeById"

export const Node = {
    async findById(id: number): Promise<false | DbNode> {
        const node = await fetchNodeById(id)

        if (!node) {
            return false
        }

        // TODO Properly map all db properties to the correct model properties
        const properties = node.properties
        properties.id = properties.mc_id

        return node.properties as DbNode
    },
}
