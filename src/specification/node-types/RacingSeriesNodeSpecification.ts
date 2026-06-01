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
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'short_name',
            datatype: 'string',
            mandatory: false,
            example: 'DTM',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'founded',
            datatype: 'number',
            mandatory: false,
            example: 2000,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'defunct',
            datatype: 'number',
            mandatory: false,
            example: null,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'organized_by',
            datatype: 'string',
            mandatory: false,
            example: 'ITR',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'vehicle_type',
            datatype: 'string',
            mandatory: false,
            example: 'touring-cars',
            scope: 'user',
            validation: ['vehicleType'],
        },
        {
            name: 'country_code',
            datatype: 'string',
            mandatory: false,
            example: 'DE',
            validation: ['countryCode'],
        },
    ],
}
