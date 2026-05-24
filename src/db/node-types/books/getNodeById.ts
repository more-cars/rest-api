import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"
import {BookNode} from "./types/BookNode"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.Book)

    if (!node) {
        return false
    }

    return node as BookNode
}
