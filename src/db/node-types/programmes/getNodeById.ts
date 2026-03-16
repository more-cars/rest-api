import {ProgrammeNode} from "./types/ProgrammeNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.Programme)

    if (!node) {
        return false
    }

    return node as ProgrammeNode
}
