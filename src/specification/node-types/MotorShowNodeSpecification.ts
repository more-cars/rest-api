import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const MotorShowNodeSpecification: NodeSpecification = {
    type: NodeType.MotorShow,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'date_from',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'date_until',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'location',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'target_audience',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'focus',
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
