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
        },
        {
            name: 'start_date',
            datatype: 'string',
            mandatory: false,
            example: '2025-05-25',
        },
        {
            name: 'start_time',
            datatype: 'string',
            mandatory: false,
            example: '15:00',
        },
        {
            name: 'duration',
            datatype: 'number',
            mandatory: false,
            example: 120,
        },
        {
            name: 'duration_unit',
            datatype: 'string',
            mandatory: false,
            example: 'min',
        },
        {
            name: 'distance',
            datatype: 'number',
            mandatory: false,
            example: 61,
        },
        {
            name: 'distance_unit',
            datatype: 'string',
            mandatory: false,
            example: 'laps',
        },
    ],
}
