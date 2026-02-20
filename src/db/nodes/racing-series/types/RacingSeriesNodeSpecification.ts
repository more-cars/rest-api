import {NodeSpecification} from "../../../types/NodeSpecification"
import {DbNodeType} from "../../../types/DbNodeType"

export const RacingSeriesNodeSpecification: NodeSpecification = {
    type: DbNodeType.RacingSeries,
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
