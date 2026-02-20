import {NodeSpecification} from "../../../types/NodeSpecification"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"

export const RacingGameNodeSpecification: NodeSpecification = {
    label: Neo4jNodeType.RacingGame,
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
