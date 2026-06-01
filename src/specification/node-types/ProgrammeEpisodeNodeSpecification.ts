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
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'season_number',
            datatype: 'number',
            mandatory: false,
            example: 2,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'season_episode_number',
            datatype: 'number',
            mandatory: false,
            example: 2,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'original_air_date',
            datatype: 'string',
            mandatory: false,
            example: '2017-12-08',
            scope: 'user',
            validation: ['date'],
        },
        {
            name: 'duration',
            datatype: 'string',
            mandatory: false,
            example: 'PT55M',
            scope: 'user',
            validation: ['duration'],
        },
    ],
}
