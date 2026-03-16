import {ProgrammeEpisodeNode} from "./types/ProgrammeEpisodeNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.ProgrammeEpisode)

    if (!node) {
        return false
    }

    return node as ProgrammeEpisodeNode
}
