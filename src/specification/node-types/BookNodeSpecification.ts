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
            validation: [], // TODO enter validation rules
        },
        {
            name: 'author',
            datatype: 'string',
            mandatory: false,
            example: "Tim Burton",
            scope: 'user',
            validation: [], // TODO enter validation rules
        },
        {
            name: 'publisher',
            datatype: 'string',
            mandatory: false,
            example: "Blink Publishing",
            scope: 'user',
            validation: [], // TODO enter validation rules
        },
        {
            name: 'year_of_publication',
            datatype: 'number',
            mandatory: false,
            example: 2016,
            scope: 'user',
            validation: [], // TODO enter validation rules
        },
        {
            name: 'isbn',
            datatype: 'string',
            mandatory: false,
            example: "9783868528893",
            scope: 'user',
            validation: [], // TODO enter validation rules
        },
        {
            name: 'pages',
            datatype: 'number',
            mandatory: false,
            example: 256,
            scope: 'user',
            validation: [], // TODO enter validation rules
        },
        {
            name: 'language',
            datatype: 'string',
            mandatory: false,
            example: "en",
            scope: 'user',
            validation: [], // TODO enter validation rules
        },
    ],
}
