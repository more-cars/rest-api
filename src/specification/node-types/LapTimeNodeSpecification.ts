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
        },
        {
            name: 'driver_name',
            datatype: 'string',
            mandatory: true,
            example: 'Klaus Ludwig',
        },
        {
            name: 'date',
            datatype: 'string',
            mandatory: false,
            example: '1996-08-03',
        },
    ],
}
