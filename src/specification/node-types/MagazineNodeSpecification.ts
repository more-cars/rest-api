import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const MagazineNodeSpecification: NodeSpecification = {
    type: NodeType.Magazine,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'founded',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'defunct',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'focus',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'publication_frequency',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'single_copy_price',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'single_copy_price_unit',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'publication_format',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'circulation',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'circulation_year',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'publisher',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'issn',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
