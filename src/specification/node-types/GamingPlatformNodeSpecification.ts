import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const GamingPlatformNodeSpecification: NodeSpecification = {
    type: NodeType.GamingPlatform,
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
