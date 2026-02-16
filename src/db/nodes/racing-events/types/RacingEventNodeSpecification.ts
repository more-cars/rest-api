import {NodeSpecification} from "../../../types/NodeSpecification"
import {NodeTypeLabel} from "../../../NodeTypeLabel"

export const RacingEventNodeSpecification: NodeSpecification = {
    label: NodeTypeLabel.RacingEvent,
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
