import {RacingSeriesNode} from "./types/RacingSeriesNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.RacingSeries)

    if (!node) {
        return false
    }

    return node as RacingSeriesNode
}
