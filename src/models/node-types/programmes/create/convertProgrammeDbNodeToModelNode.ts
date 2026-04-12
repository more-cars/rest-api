import {ProgrammeNode as ProgrammeNodeInput} from "../../../../db/node-types/programmes/types/ProgrammeNode"
import {ProgrammeNode} from "../types/ProgrammeNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertProgrammeDbNodeToModelNode(data: ProgrammeNodeInput): ProgrammeNode {
    return {
        node_type: ModelNodeType.Programme,
        attributes: {
            id: data.properties.id,
            name: data.properties.name,
            aired_from_year: data.properties.aired_from_year,
            aired_until_year: data.properties.aired_until_year,
            channel: data.properties.channel,
            total_seasons: data.properties.total_seasons,
            total_episodes: data.properties.total_episodes,
            regular_episode_running_time: data.properties.regular_episode_running_time,
            country_code: data.properties.country_code,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies ProgrammeNode
}
