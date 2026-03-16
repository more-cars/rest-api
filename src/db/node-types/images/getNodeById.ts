import {ImageNode} from "./types/ImageNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.Image)

    if (!node) {
        return false
    }

    return node as ImageNode
}
