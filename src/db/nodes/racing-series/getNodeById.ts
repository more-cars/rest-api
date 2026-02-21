import {RacingSeriesNode} from "./types/RacingSeriesNode"
import {fetchNodeById} from "../fetchNodeById"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return node as RacingSeriesNode
}
