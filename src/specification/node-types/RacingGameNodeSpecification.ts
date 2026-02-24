import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const RacingGameNodeSpecification: NodeSpecification = {
    type: NodeType.RacingGame,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'release_year',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'developer',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'publisher',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
