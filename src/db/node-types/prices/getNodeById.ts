import {PriceNode} from "./types/PriceNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.Price)

    if (!node) {
        return false
    }

    return node as PriceNode
}
