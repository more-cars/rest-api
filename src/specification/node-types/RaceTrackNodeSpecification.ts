import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const RaceTrackNodeSpecification: NodeSpecification = {
    type: NodeType.RaceTrack,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'Lausitzring',
        },
        {
            name: 'opened',
            datatype: 'number',
            mandatory: false,
            example: 2000,
        },
        {
            name: 'closed',
            datatype: 'number',
            mandatory: false,
            example: null,
        },
        {
            name: 'type',
            datatype: 'string',
            mandatory: false,
            example: 'permanent race track',
        },
        {
            name: 'location',
            datatype: 'string',
            mandatory: false,
            example: 'Klettwitz',
        },
        {
            name: 'geo_position',
            datatype: 'string',
            mandatory: false,
            example: '51°32’0”N 13°55’10”E',
        },
        {
            name: 'country_code',
            datatype: 'string',
            mandatory: false,
            example: 'DE',
        },
    ],
}
