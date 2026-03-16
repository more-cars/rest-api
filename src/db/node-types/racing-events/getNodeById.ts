import {RacingEventNode} from "./types/RacingEventNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.RacingEvent)

    if (!node) {
        return false
    }

    return node as RacingEventNode
}
