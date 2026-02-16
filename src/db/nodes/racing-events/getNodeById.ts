import {RacingEventNode} from "./types/RacingEventNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {mapDbNodeToRacingEventNode} from "./mapDbNodeToRacingEventNode"

export async function getNodeById(id: number): Promise<false | RacingEventNode> {
    const node = await fetchNodeFromDb(id)

    if (!node) {
        return false
    }

    return mapDbNodeToRacingEventNode(node)
}
