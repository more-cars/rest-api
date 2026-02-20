import {NodeSpecification} from "../../../types/NodeSpecification"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {DbNodeType} from "../../../types/DbNodeType"

export const RacingEventNodeSpecification: NodeSpecification = {
    type: DbNodeType.RacingEvent,
    label: Neo4jNodeType.RacingEvent,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'round',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'date_from',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'date_to',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
