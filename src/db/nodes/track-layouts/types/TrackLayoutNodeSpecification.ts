import {NodeSpecification} from "../../../types/NodeSpecification"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {DbNodeType} from "../../../types/DbNodeType"

export const TrackLayoutNodeSpecification: NodeSpecification = {
    type: DbNodeType.TrackLayout,
    label: Neo4jNodeType.TrackLayout,
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
