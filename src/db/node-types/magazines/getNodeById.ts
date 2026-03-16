import {MagazineNode} from "./types/MagazineNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.Magazine)

    if (!node) {
        return false
    }

    return node as MagazineNode
}
