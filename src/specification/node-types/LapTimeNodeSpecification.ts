import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const LapTimeNodeSpecification: NodeSpecification = {
    type: NodeType.LapTime,
    properties: [
        {
            name: 'time',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'driver_name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'date',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
