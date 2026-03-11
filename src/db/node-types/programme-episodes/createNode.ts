import {InputProgrammeEpisodeCreate} from "./types/InputProgrammeEpisodeCreate"
import {ProgrammeEpisodeNode} from "./types/ProgrammeEpisodeNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertProgrammeEpisodeNeo4jNodeToDbNode} from "./convertProgrammeEpisodeNeo4jNodeToDbNode"

export async function createNode(data: InputProgrammeEpisodeCreate): Promise<ProgrammeEpisodeNode> {
    const node = await createNeo4jNode(DbNodeType.ProgrammeEpisode, data)

    return convertProgrammeEpisodeNeo4jNodeToDbNode(node)
}
