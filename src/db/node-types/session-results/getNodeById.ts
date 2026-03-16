import {SessionResultNode} from "./types/SessionResultNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.SessionResult)

    if (!node) {
        return false
    }

    return node as SessionResultNode
}
