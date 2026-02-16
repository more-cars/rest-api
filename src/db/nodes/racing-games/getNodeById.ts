import {RacingGameNode} from "./types/RacingGameNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {mapDbNodeToRacingGameNode} from "./mapDbNodeToRacingGameNode"

export async function getNodeById(id: number): Promise<false | RacingGameNode> {
    const node = await fetchNodeFromDb(id)

    if (!node) {
        return false
    }

    return mapDbNodeToRacingGameNode(node)
}
