import {RacingSeriesNode} from "./types/RacingSeriesNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRacingSeriesNode} from "./mapDbNodeToRacingSeriesNode"

export async function getNodeById(id: number): Promise<false | RacingSeriesNode> {
    const node = await fetchNodeFromDb(id, NodeTypeLabel.RacingSeries)

    if (!node) {
        return false
    }

    return mapDbNodeToRacingSeriesNode(node)
}
