import {InputProgrammeEpisodeCreate} from "./types/InputProgrammeEpisodeCreate"
import {ProgrammeEpisodeNode} from "./types/ProgrammeEpisodeNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputProgrammeEpisodeCreate): Promise<ProgrammeEpisodeNode> {
    return await createNeo4jNode(DbNodeType.ProgrammeEpisode, data) as ProgrammeEpisodeNode
}
