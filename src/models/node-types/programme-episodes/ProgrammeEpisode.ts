import {CreateProgrammeEpisodeInput} from "./types/CreateProgrammeEpisodeInput"
import {ProgrammeEpisodeNode} from "./types/ProgrammeEpisodeNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/programme-episodes/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"

export const ProgrammeEpisode = {
    async create(data: CreateProgrammeEpisodeInput): Promise<ProgrammeEpisodeNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as ProgrammeEpisodeNode
    },
}
