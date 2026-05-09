import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const RacingSessionNodeSpecification: NodeSpecification = {
    type: NodeType.RacingSession,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'Grand Prix',
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'start_date',
            datatype: 'string',
            mandatory: false,
            example: '2025-05-25',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'start_time',
            datatype: 'string',
            mandatory: false,
            example: '15:00',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'duration',
            datatype: 'number',
            mandatory: false,
            example: 120,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'duration_unit',
            datatype: 'string',
            mandatory: false,
            example: 'min',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'distance',
            datatype: 'number',
            mandatory: false,
            example: 61,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'distance_unit',
            datatype: 'string',
            mandatory: false,
            example: 'laps',
            scope: 'user',
            validation: ['string'],
        },
    ],
}
