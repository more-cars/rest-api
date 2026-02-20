import {NodeSpecification} from "../../../types/NodeSpecification"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"

export const SessionResultNodeSpecification: NodeSpecification = {
    label: Neo4jNodeType.SessionResult,
    properties: [
        {
            name: 'position',
            datatype: 'number',
            mandatory: true,
        },
        {
            name: 'race_number',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'driver_name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'team_name',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'race_time',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'laps',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'status',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'points',
            datatype: 'number',
            mandatory: false,
        },
    ],
}
