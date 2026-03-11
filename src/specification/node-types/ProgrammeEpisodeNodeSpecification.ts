import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const ProgrammeEpisodeNodeSpecification: NodeSpecification = {
    type: NodeType.ProgrammeEpisode,
    properties: [
        {
            name: 'title',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'season_number',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'season_episode_number',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'original_air_date',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'duration',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
