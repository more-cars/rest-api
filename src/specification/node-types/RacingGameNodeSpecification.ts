import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const RacingGameNodeSpecification: NodeSpecification = {
    type: NodeType.RacingGame,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'Forza Motorsport 7',
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'release_year',
            datatype: 'number',
            mandatory: false,
            example: 2017,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'developer',
            datatype: 'string',
            mandatory: false,
            example: 'Turn 10 Studios',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'publisher',
            datatype: 'string',
            mandatory: false,
            example: 'Microsoft Studios',
            scope: 'user',
            validation: ['string'],
        },
    ],
}
