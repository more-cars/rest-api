import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const MotorShowNodeSpecification: NodeSpecification = {
    type: NodeType.MotorShow,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: '2017 IAA Frankfurt',
        },
        {
            name: 'date_from',
            datatype: 'string',
            mandatory: false,
            example: '2017-09-14',
        },
        {
            name: 'date_until',
            datatype: 'string',
            mandatory: false,
            example: '2017-09-24',
        },
        {
            name: 'location',
            datatype: 'string',
            mandatory: false,
            example: 'Frankfurt',
        },
        {
            name: 'target_audience',
            datatype: 'string',
            mandatory: false,
            example: 'international',
        },
        {
            name: 'focus',
            datatype: 'string',
            mandatory: false,
            example: 'new cars',
        },
        {
            name: 'country_code',
            datatype: 'string',
            mandatory: false,
            example: 'DE',
        },
    ],
}
