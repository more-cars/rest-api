import {ProgrammeEpisodeNode as ProgrammeEpisodeNodeInput} from "../../../../db/node-types/programme-episodes/types/ProgrammeEpisodeNode"
import {ProgrammeEpisodeNode} from "../types/ProgrammeEpisodeNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertProgrammeEpisodeDbNodeToModelNode(data: ProgrammeEpisodeNodeInput): ProgrammeEpisodeNode {
    return {
        node_type: ModelNodeType.ProgrammeEpisode,
        attributes: {
            id: data.properties.id,
            title: data.properties.title,
            season_number: data.properties.season_number,
            season_episode_number: data.properties.season_episode_number,
            original_air_date: data.properties.original_air_date,
            duration: data.properties.duration,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies ProgrammeEpisodeNode
}
