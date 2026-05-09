import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const CompanyNodeSpecification: NodeSpecification = {
    type: NodeType.Company,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'BMW AG',
            scope: 'user',
            validation: ['mandatory', 'string']
        },
        {
            name: 'founded',
            datatype: 'number',
            mandatory: false,
            example: 1916,
            scope: 'user',
            validation: ['number']
        },
        {
            name: 'defunct',
            datatype: 'number',
            mandatory: false,
            example: null,
            scope: 'user',
            validation: ['number']
        },
        {
            name: 'headquarters_location',
            datatype: 'string',
            mandatory: false,
            example: 'Munich',
            scope: 'user',
            validation: ['string']
        },
        {
            name: 'hq_country_code',
            datatype: 'string',
            mandatory: false,
            example: 'DE',
            scope: 'user',
            validation: ['isValidCountryCode'],
        },
        {
            name: 'legal_headquarters_location',
            datatype: 'string',
            mandatory: false,
            example: 'Munich',
            scope: 'user',
            validation: ['string']
        },
        {
            name: 'legal_hq_country_code',
            datatype: 'string',
            mandatory: false,
            example: 'DE',
            scope: 'user',
            validation: ['isValidCountryCode'],
        },
    ],
}
