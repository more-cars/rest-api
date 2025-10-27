import {RacingSessionNode} from "./types/RacingSessionNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRacingSessionNode} from "./mapDbNodeToRacingSessionNode"

export async function getNodeById(id: number): Promise<false | RacingSessionNode> {
    const node = await fetchNodeFromDb(id, NodeTypeLabel.RacingSession)

    if (!node) {
        return false
    }

    return mapDbNodeToRacingSessionNode(node)
}
