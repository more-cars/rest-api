import {RacingSessionNode} from "./types/RacingSessionNode"
import {fetchNodeById} from "../fetchNodeById"
import {mapDbNodeToRacingSessionNode} from "./mapDbNodeToRacingSessionNode"

export async function getNodeById(id: number): Promise<false | RacingSessionNode> {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return mapDbNodeToRacingSessionNode(node)
}
