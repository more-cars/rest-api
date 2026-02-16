import {NodeSpecification} from "../../../types/NodeSpecification"
import {NodeTypeLabel} from "../../../NodeTypeLabel"

export const RacingGameNodeSpecification: NodeSpecification = {
    label: NodeTypeLabel.RacingGame,
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
