import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const TrackLayoutNodeSpecification: NodeSpecification = {
    type: NodeType.TrackLayout,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'GP Circuit',
        },
        {
            name: 'year_from',
            datatype: 'number',
            mandatory: false,
            example: 1967,
        },
        {
            name: 'year_to',
            datatype: 'number',
            mandatory: false,
            example: 1999,
        },
        {
            name: 'length',
            datatype: 'number',
            mandatory: false,
            example: 5.397,
        },
        {
            name: 'length_unit',
            datatype: 'string',
            mandatory: false,
            example: 'km',
        },
        {
            name: 'direction',
            datatype: 'string',
            mandatory: false,
            example: 'clockwise',
        },
        {
            name: 'elevation_change',
            datatype: 'number',
            mandatory: false,
            example: 73,
        },
        {
            name: 'elevation_change_unit',
            datatype: 'string',
            mandatory: false,
            example: 'm',
        },
        {
            name: 'surface',
            datatype: 'string',
            mandatory: false,
            example: 'asphalt',
        },
    ],
}
