import {NodeSpecification} from "../../../types/NodeSpecification"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {DbNodeType} from "../../../types/DbNodeType"

export const LapTimeNodeSpecification: NodeSpecification = {
    type: DbNodeType.LapTime,
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
