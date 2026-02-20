import {NodeSpecification} from "../../../types/NodeSpecification"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"

export const LapTimeNodeSpecification: NodeSpecification = {
    label: Neo4jNodeType.LapTime,
    properties: [
        {
            name: 'time',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'driver_name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'date',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
