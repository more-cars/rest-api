import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const RacingSeriesNodeSpecification: NodeSpecification = {
    type: NodeType.RacingSeries,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'Deutsche Tourenwagen-Masters',
        },
        {
            name: 'short_name',
            datatype: 'string',
            mandatory: false,
            example: 'DTM',
        },
        {
            name: 'founded',
            datatype: 'number',
            mandatory: false,
            example: 2000,
        },
        {
            name: 'defunct',
            datatype: 'number',
            mandatory: false,
            example: null,
        },
        {
            name: 'organized_by',
            datatype: 'string',
            mandatory: false,
            example: 'ITR',
        },
        {
            name: 'vehicle_type',
            datatype: 'string',
            mandatory: false,
            example: 'touring cars',
        },
        {
            name: 'country_code',
            datatype: 'string',
            mandatory: false,
            example: 'DE',
        },
    ],
}
