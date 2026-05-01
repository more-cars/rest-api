import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"
import type {RevisionNode} from "./types/RevisionNode"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.Revision)

    if (!node) {
        return false
    }

    return node as RevisionNode
}
