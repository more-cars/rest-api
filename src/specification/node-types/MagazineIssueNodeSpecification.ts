import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const MagazineIssueNodeSpecification: NodeSpecification = {
    type: NodeType.MagazineIssue,
    properties: [
        {
            name: 'title',
            datatype: 'string',
            mandatory: true,
            example: 'Sieger-Typen',
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'consecutive_number',
            datatype: 'number',
            mandatory: false,
            example: null,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'issue_number',
            datatype: 'number',
            mandatory: false,
            example: 11,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'issue_year',
            datatype: 'number',
            mandatory: false,
            example: 2025,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'release_date',
            datatype: 'string',
            mandatory: false,
            example: '2025-10-01',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'single_copy_price',
            datatype: 'number',
            mandatory: false,
            example: 5.4,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'single_copy_price_unit',
            datatype: 'string',
            mandatory: false,
            example: 'EUR',
            validation: ['isValidCurrencyCode'],
        },
        {
            name: 'pages',
            datatype: 'number',
            mandatory: false,
            example: 148,
            scope: 'user',
            validation: ['number'],
        },
    ],
}
