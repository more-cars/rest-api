import {RacingEventNode} from "./types/RacingEventNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRacingEventNode} from "./mapDbNodeToRacingEventNode"

export async function getNodeById(id: number): Promise<false | RacingEventNode> {
    const node = await fetchNodeFromDb(id, NodeTypeLabel.RacingEvent)

    if (!node) {
        return false
    }

    return mapDbNodeToRacingEventNode(node)
}
