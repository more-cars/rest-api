import {RatingNode} from "./types/RatingNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.Rating)

    if (!node) {
        return false
    }

    return node as RatingNode
}
