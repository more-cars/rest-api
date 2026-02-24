import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const RaceTrackNodeSpecification: NodeSpecification = {
    type: NodeType.RaceTrack,
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
