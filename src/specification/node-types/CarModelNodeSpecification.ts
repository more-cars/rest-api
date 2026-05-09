import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const CarModelNodeSpecification: NodeSpecification = {
    type: NodeType.CarModel,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'Corvette',
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'built_from',
            datatype: 'number',
            mandatory: false,
            example: 1976,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'built_to',
            datatype: 'number',
            mandatory: false,
            example: 1987,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'generation',
            datatype: 'number',
            mandatory: false,
            example: 3,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'internal_code',
            datatype: 'string',
            mandatory: false,
            example: 'C3',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'total_production',
            datatype: 'number',
            mandatory: false,
            example: 1234567,
            scope: 'user',
            validation: ['number'],
        },
    ],
}
