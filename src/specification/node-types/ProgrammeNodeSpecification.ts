import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const ProgrammeNodeSpecification: NodeSpecification = {
    type: NodeType.Programme,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'Top Gear',
        },
        {
            name: 'aired_from_year',
            datatype: 'number',
            mandatory: false,
            example: 2002,
        },
        {
            name: 'aired_until_year',
            datatype: 'number',
            mandatory: false,
            example: 2022,
        },
        {
            name: 'channel',
            datatype: 'string',
            mandatory: false,
            example: 'BBC Two',
        },
        {
            name: 'total_seasons',
            datatype: 'number',
            mandatory: false,
            example: 33,
        },
        {
            name: 'total_episodes',
            datatype: 'number',
            mandatory: false,
            example: 240,
        },
        {
            name: 'regular_episode_running_time',
            datatype: 'string',
            mandatory: false,
            example: 'PT60M',
        },
        {
            name: 'country_code',
            datatype: 'string',
            mandatory: false,
            example: 'DE',
        },
    ],
}
