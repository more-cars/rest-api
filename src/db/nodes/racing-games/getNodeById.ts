import {RacingGameNode} from "./types/RacingGameNode"
import {fetchNodeById} from "../fetchNodeById"
import {mapDbNodeToRacingGameNode} from "./mapDbNodeToRacingGameNode"

export async function getNodeById(id: number): Promise<false | RacingGameNode> {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return mapDbNodeToRacingGameNode(node)
}
