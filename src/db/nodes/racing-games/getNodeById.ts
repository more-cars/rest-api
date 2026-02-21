import {RacingGameNode} from "./types/RacingGameNode"
import {fetchNodeById} from "../fetchNodeById"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return node as RacingGameNode
}
