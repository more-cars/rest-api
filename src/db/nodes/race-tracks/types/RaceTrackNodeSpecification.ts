import {NodeSpecification} from "../../../types/NodeSpecification"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"

export const RaceTrackNodeSpecification: NodeSpecification = {
    label: Neo4jNodeType.RaceTrack,
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
