import {NodeSpecification} from "../../../types/NodeSpecification"
import {DbNodeType} from "../../../types/DbNodeType"

export const RaceTrackNodeSpecification: NodeSpecification = {
    type: DbNodeType.RaceTrack,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'opened',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'closed',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'type',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'location',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'geo_position',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
