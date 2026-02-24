import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const RacingEventNodeSpecification: NodeSpecification = {
    type: NodeType.RacingEvent,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'round',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'date_from',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'date_to',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
