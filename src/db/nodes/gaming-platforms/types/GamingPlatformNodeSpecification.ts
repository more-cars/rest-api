import {NodeSpecification} from "../../../types/NodeSpecification"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"

export const GamingPlatformNodeSpecification: NodeSpecification = {
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
