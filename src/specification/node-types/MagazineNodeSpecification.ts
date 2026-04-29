import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const MagazineNodeSpecification: NodeSpecification = {
    type: NodeType.Magazine,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'Top Gear',
        },
        {
            name: 'founded',
            datatype: 'number',
            mandatory: false,
            example: 1993,
        },
        {
            name: 'defunct',
            datatype: 'number',
            mandatory: false,
            example: null,
        },
        {
            name: 'focus',
            datatype: 'string',
            mandatory: false,
            example: 'sports cars',
        },
        {
            name: 'publication_frequency',
            datatype: 'string',
            mandatory: false,
            example: 'monthly',
        },
        {
            name: 'single_copy_price',
            datatype: 'number',
            mandatory: false,
            example: 5.99,
        },
        {
            name: 'single_copy_price_unit',
            datatype: 'string',
            mandatory: false,
            example: 'GBP',
        },
        {
            name: 'publication_format',
            datatype: 'string',
            mandatory: false,
            example: 'print',
        },
        {
            name: 'circulation',
            datatype: 'number',
            mandatory: false,
            example: 150884,
        },
        {
            name: 'circulation_year',
            datatype: 'number',
            mandatory: false,
            example: 2013,
        },
        {
            name: 'publisher',
            datatype: 'string',
            mandatory: false,
            example: 'Immediate Media Company',
        },
        {
            name: 'issn',
            datatype: 'string',
            mandatory: false,
            example: '1350-9624',
        },
        {
            name: 'country_code',
            datatype: 'string',
            mandatory: false,
            example: 'GB',
        },
    ],
}
