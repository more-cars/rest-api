import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const SessionResultNodeSpecification: NodeSpecification = {
    type: NodeType.SessionResult,
    properties: [
        {
            name: 'position',
            datatype: 'number',
            mandatory: true,
            example: 1,
            scope: 'user',
            validation: ['mandatory', 'number'],
        },
        {
            name: 'race_number',
            datatype: 'string',
            mandatory: false,
            example: '44',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'driver_name',
            datatype: 'string',
            mandatory: true,
            example: 'Lewis Hamilton',
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'team_name',
            datatype: 'string',
            mandatory: false,
            example: 'Mercedes',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'race_time',
            datatype: 'string',
            mandatory: false,
            example: 'PT1H23M45.678S',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'laps',
            datatype: 'number',
            mandatory: false,
            example: 51,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'status',
            datatype: 'string',
            mandatory: false,
            example: 'finished',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'points',
            datatype: 'number',
            mandatory: false,
            example: 25,
            scope: 'user',
            validation: ['number'],
        },
    ],
}
