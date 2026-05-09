import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const BrandNodeSpecification: NodeSpecification = {
    type: NodeType.Brand,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'BMW',
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'full_name',
            datatype: 'string',
            mandatory: false,
            example: 'Bayerische Motoren Werke',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'founded',
            datatype: 'number',
            mandatory: false,
            example: 1916,
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
            name: 'wmi',
            datatype: 'string',
            mandatory: false,
            example: 'WBA',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'hsn',
            datatype: 'string',
            mandatory: false,
            example: '0005',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'country_code',
            datatype: 'string',
            mandatory: false,
            example: 'DE',
            validation: ['isValidCountryCode'],
        },
    ],
}
