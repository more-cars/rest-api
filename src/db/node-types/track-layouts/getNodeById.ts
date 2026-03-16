import {TrackLayoutNode} from "./types/TrackLayoutNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.TrackLayout)

    if (!node) {
        return false
    }

    return node as TrackLayoutNode
}
