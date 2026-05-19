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
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'aired_from_year',
            datatype: 'number',
            mandatory: false,
            example: 2002,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'aired_until_year',
            datatype: 'number',
            mandatory: false,
            example: 2022,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'channel',
            datatype: 'string',
            mandatory: false,
            example: 'BBC Two',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'total_seasons',
            datatype: 'number',
            mandatory: false,
            example: 33,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'total_episodes',
            datatype: 'number',
            mandatory: false,
            example: 240,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'regular_episode_running_time',
            datatype: 'string',
            mandatory: false,
            example: 'PT60M',
            scope: 'user',
            validation: ['string', 'duration'],
        },
        {
            name: 'country_code',
            datatype: 'string',
            mandatory: false,
            example: 'GB',
            validation: ['countryCode'],
        },
    ],
}
