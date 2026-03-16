import {RacingSessionNode} from "./types/RacingSessionNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.RacingSession)

    if (!node) {
        return false
    }

    return node as RacingSessionNode
}
