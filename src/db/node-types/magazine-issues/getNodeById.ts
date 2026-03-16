import {MagazineIssueNode} from "./types/MagazineIssueNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.MagazineIssue)

    if (!node) {
        return false
    }

    return node as MagazineIssueNode
}
