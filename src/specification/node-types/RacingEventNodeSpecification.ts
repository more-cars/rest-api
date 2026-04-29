import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const RacingEventNodeSpecification: NodeSpecification = {
    type: NodeType.RacingEvent,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'GP Monaco',
        },
        {
            name: 'round',
            datatype: 'number',
            mandatory: false,
            example: 7,
        },
        {
            name: 'date_from',
            datatype: 'string',
            mandatory: false,
            example: '2025-05-20',
        },
        {
            name: 'date_to',
            datatype: 'string',
            mandatory: false,
            example: '2025-05-22',
        },
    ],
}
