import {RacingSessionNode} from "./types/RacingSessionNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {mapDbNodeToRacingSessionNode} from "./mapDbNodeToRacingSessionNode"

export async function getNodeById(id: number): Promise<false | RacingSessionNode> {
    const node = await fetchNodeFromDb(id)

    if (!node) {
        return false
    }

    return mapDbNodeToRacingSessionNode(node)
}
