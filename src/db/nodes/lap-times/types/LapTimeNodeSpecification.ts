import {NodeSpecification} from "../../../types/NodeSpecification"
import {DbNodeType} from "../../../types/DbNodeType"

export const LapTimeNodeSpecification: NodeSpecification = {
    type: DbNodeType.LapTime,
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
