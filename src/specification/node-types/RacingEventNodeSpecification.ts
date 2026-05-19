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
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'round',
            datatype: 'number',
            mandatory: false,
            example: 7,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'date_from',
            datatype: 'string',
            mandatory: false,
            example: '2025-05-20',
            scope: 'user',
            validation: ['string', 'date'],
        },
        {
            name: 'date_to',
            datatype: 'string',
            mandatory: false,
            example: '2025-05-22',
            scope: 'user',
            validation: ['string', 'date'],
        },
    ],
}
