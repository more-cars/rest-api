import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const LapTimeNodeSpecification: NodeSpecification = {
    type: NodeType.LapTime,
    properties: [
        {
            name: 'time',
            datatype: 'string',
            mandatory: true,
            example: 'PT1M33.294S',
            scope: 'user',
            validation: ['mandatory', 'duration'],
        },
        {
            name: 'driver_name',
            datatype: 'string',
            mandatory: true,
            example: 'Klaus Ludwig',
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'date',
            datatype: 'string',
            mandatory: false,
            example: '1996-08-03',
            scope: 'user',
            validation: ['string', 'date'],
        },
    ],
}
