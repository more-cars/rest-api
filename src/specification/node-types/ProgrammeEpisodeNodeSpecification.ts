import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const ProgrammeEpisodeNodeSpecification: NodeSpecification = {
    type: NodeType.ProgrammeEpisode,
    properties: [
        {
            name: 'title',
            datatype: 'string',
            mandatory: true,
            example: 'The Falls Guys',
        },
        {
            name: 'season_number',
            datatype: 'number',
            mandatory: false,
            example: 2,
        },
        {
            name: 'season_episode_number',
            datatype: 'number',
            mandatory: false,
            example: 2,
        },
        {
            name: 'original_air_date',
            datatype: 'string',
            mandatory: false,
            example: '2017-12-08',
        },
        {
            name: 'duration',
            datatype: 'string',
            mandatory: false,
            example: 'PT55M',
        },
    ],
}
