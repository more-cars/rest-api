import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const PriceNodeSpecification: NodeSpecification = {
    type: NodeType.Price,
    properties: [
        {
            name: 'price',
            datatype: 'number',
            mandatory: true,
            example: 59990,
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'price_year',
            datatype: 'number',
            mandatory: true,
            example: 2020,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'currency_code',
            datatype: 'string',
            mandatory: true,
            example: 'EUR',
            validation: ['isValidCurrencyCode'],
        },
        {
            name: 'country_code',
            datatype: 'string',
            mandatory: true,
            example: 'DE',
            validation: ['isValidCountryCode'],
        },
    ],
}
