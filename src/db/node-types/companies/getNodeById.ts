import {CompanyNode} from "./types/CompanyNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.Company)

    if (!node) {
        return false
    }

    return node as CompanyNode
}
