import type {BaseNode} from "../db/types/BaseNode"
import {getNodeById} from "../db/nodes/getNodeById"

export class Node {
    static async findById(id: number): Promise<false | BaseNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        // TODO map db properties to model properties

        return node
    }
}
