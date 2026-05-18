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
            validation: ['mandatory', 'number'],
        },
        {
            name: 'price_year',
            datatype: 'number',
            mandatory: true,
            example: 2020,
            scope: 'user',
            validation: ['mandatory', 'number'],
        },
        {
            name: 'currency_code',
            datatype: 'string',
            mandatory: true,
            example: 'EUR',
            validation: ['mandatory', 'isValidCurrencyCode'],
        },
        {
            name: 'country_code',
            datatype: 'string',
            mandatory: true,
            example: 'DE',
            validation: ['mandatory', 'countryCode'],
        },
    ],
}
