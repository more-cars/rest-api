import {NodeSpecification} from "../../../types/NodeSpecification"
import {NodeTypeLabel} from "../../../NodeTypeLabel"

export const TrackLayoutNodeSpecification: NodeSpecification = {
    label: NodeTypeLabel.TrackLayout,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'year_from',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'year_to',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'length',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'length_unit',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'direction',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'elevation_change',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'elevation_change_unit',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'surface',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
