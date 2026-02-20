import {NodeSpecification} from "../../../types/NodeSpecification"
import {DbNodeType} from "../../../types/DbNodeType"

export const RacingEventNodeSpecification: NodeSpecification = {
    type: DbNodeType.RacingEvent,
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
