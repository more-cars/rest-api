import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const BookNodeSpecification: NodeSpecification = {
    type: NodeType.Book,
    properties: [
        {
            name: 'title',
            datatype: 'string',
            mandatory: true,
            example: "Living the Supercar Dream",
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'author',
            datatype: 'string',
            mandatory: false,
            example: "Tim Burton",
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'publisher',
            datatype: 'string',
            mandatory: false,
            example: "Blink Publishing",
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'year_of_publication',
            datatype: 'number',
            mandatory: false,
            example: 2016,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'isbn',
            datatype: 'string',
            mandatory: false,
            example: "978-3-86-852889-3",
            scope: 'user',
            validation: ['isbn'],
        },
        {
            name: 'pages',
            datatype: 'number',
            mandatory: false,
            example: 256,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'language',
            datatype: 'string',
            mandatory: false,
            example: "en",
            scope: 'user',
            validation: ['languageCode'],
        },
    ],
}
