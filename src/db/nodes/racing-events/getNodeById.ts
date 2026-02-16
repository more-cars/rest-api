import {RacingEventNode} from "./types/RacingEventNode"
import {fetchNodeById} from "../fetchNodeById"
import {mapDbNodeToRacingEventNode} from "./mapDbNodeToRacingEventNode"

export async function getNodeById(id: number): Promise<false | RacingEventNode> {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return mapDbNodeToRacingEventNode(node)
}
