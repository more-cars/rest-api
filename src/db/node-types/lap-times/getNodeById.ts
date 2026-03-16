import {LapTimeNode} from "./types/LapTimeNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.LapTime)

    if (!node) {
        return false
    }

    return node as LapTimeNode
}
