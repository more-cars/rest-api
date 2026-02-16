import {NodeSpecification} from "../../../types/NodeSpecification"
import {NodeTypeLabel} from "../../../NodeTypeLabel"

export const RaceTrackNodeSpecification: NodeSpecification = {
    label: NodeTypeLabel.RaceTrack,
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
