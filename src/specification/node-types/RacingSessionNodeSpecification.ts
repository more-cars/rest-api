import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const RacingSessionNodeSpecification: NodeSpecification = {
    type: NodeType.RacingSession,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'start_date',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'start_time',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'duration',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'duration_unit',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'distance',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'distance_unit',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
