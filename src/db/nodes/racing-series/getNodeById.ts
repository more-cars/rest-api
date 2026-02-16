import {RacingSeriesNode} from "./types/RacingSeriesNode"
import {fetchNodeById} from "../fetchNodeById"
import {mapDbNodeToRacingSeriesNode} from "./mapDbNodeToRacingSeriesNode"

export async function getNodeById(id: number): Promise<false | RacingSeriesNode> {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return mapDbNodeToRacingSeriesNode(node)
}
