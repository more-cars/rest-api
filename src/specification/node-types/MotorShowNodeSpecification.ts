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
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'date_from',
            datatype: 'string',
            mandatory: false,
            example: '2017-09-14',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'date_until',
            datatype: 'string',
            mandatory: false,
            example: '2017-09-24',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'location',
            datatype: 'string',
            mandatory: false,
            example: 'Frankfurt',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'target_audience',
            datatype: 'string',
            mandatory: false,
            example: 'international',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'focus',
            datatype: 'string',
            mandatory: false,
            example: 'new cars',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'country_code',
            datatype: 'string',
            mandatory: false,
            example: 'DE',
            validation: ['countryCode'],
        },
    ],
}
