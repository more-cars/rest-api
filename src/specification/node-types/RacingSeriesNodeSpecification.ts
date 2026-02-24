import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const RacingSeriesNodeSpecification: NodeSpecification = {
    type: NodeType.RacingSeries,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'short_name',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'founded',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'defunct',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'organized_by',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'vehicle_type',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
