import {RacingSeriesNode} from "./types/RacingSeriesNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {mapDbNodeToRacingSeriesNode} from "./mapDbNodeToRacingSeriesNode"

export async function getNodeById(id: number): Promise<false | RacingSeriesNode> {
    const node = await fetchNodeFromDb(id)

    if (!node) {
        return false
    }

    return mapDbNodeToRacingSeriesNode(node)
}
