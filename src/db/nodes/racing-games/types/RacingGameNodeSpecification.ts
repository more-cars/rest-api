import {NodeSpecification} from "../../../types/NodeSpecification"
import {DbNodeType} from "../../../types/DbNodeType"

export const RacingGameNodeSpecification: NodeSpecification = {
    type: DbNodeType.RacingGame,
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
