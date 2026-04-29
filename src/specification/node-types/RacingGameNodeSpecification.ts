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
        },
        {
            name: 'release_year',
            datatype: 'number',
            mandatory: false,
            example: 2017,
        },
        {
            name: 'developer',
            datatype: 'string',
            mandatory: false,
            example: 'Turn 10 Studios',
        },
        {
            name: 'publisher',
            datatype: 'string',
            mandatory: false,
            example: 'Microsoft Studios',
        },
    ],
}
