import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const ModelCarNodeSpecification: NodeSpecification = {
    type: NodeType.ModelCar,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'BMW 2002',
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'product_code',
            datatype: 'string',
            mandatory: false,
            example: 'DHX60',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'release_year',
            datatype: 'number',
            mandatory: false,
            example: 2016,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'scale',
            datatype: 'string',
            mandatory: false,
            example: '1:64',
            scope: 'user',
            validation: ['string', 'modelScale'],
        },
        {
            name: 'series',
            datatype: 'string',
            mandatory: false,
            example: 'BMW',
            scope: 'user',
            validation: ['string'],
        },
    ],
}
