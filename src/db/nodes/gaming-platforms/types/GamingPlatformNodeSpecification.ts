import {NodeSpecification} from "../../../types/NodeSpecification"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {DbNodeType} from "../../../types/DbNodeType"

export const GamingPlatformNodeSpecification: NodeSpecification = {
    type: DbNodeType.GamingPlatform,
    label: Neo4jNodeType.GamingPlatform,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'release_year',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'manufacturer',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
