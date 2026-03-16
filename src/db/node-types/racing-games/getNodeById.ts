import {RacingGameNode} from "./types/RacingGameNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.RacingGame)

    if (!node) {
        return false
    }

    return node as RacingGameNode
}
