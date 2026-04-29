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
        },
        {
            name: 'race_number',
            datatype: 'string',
            mandatory: false,
            example: '44',
        },
        {
            name: 'driver_name',
            datatype: 'string',
            mandatory: true,
            example: 'Lewis Hamilton',
        },
        {
            name: 'team_name',
            datatype: 'string',
            mandatory: false,
            example: 'Mercedes',
        },
        {
            name: 'race_time',
            datatype: 'string',
            mandatory: false,
            example: 'PT1H23M45.678S',
        },
        {
            name: 'laps',
            datatype: 'number',
            mandatory: false,
            example: 51,
        },
        {
            name: 'status',
            datatype: 'string',
            mandatory: false,
            example: 'finished',
        },
        {
            name: 'points',
            datatype: 'number',
            mandatory: false,
            example: 25,
        },
    ],
}
