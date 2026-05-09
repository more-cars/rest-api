import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const ModelCarBrandNodeSpecification: NodeSpecification = {
    type: NodeType.ModelCarBrand,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'Hot Wheels',
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'founded',
            datatype: 'number',
            mandatory: false,
            example: 1968,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'defunct',
            datatype: 'number',
            mandatory: false,
            example: null,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'country_code',
            datatype: 'string',
            mandatory: false,
            example: 'US',
            validation: ['isValidCountryCode'],
        },
    ],
}
