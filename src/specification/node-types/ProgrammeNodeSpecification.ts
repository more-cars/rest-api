import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const ProgrammeNodeSpecification: NodeSpecification = {
    type: NodeType.Programme,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'aired_from_year',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'aired_until_year',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'channel',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'total_seasons',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'total_episodes',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'regular_episode_running_time',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'country_code',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
