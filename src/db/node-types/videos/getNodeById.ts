import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"
import {VideoNode} from "./types/VideoNode"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.Video)

    if (!node) {
        return false
    }

    return node as VideoNode
}
