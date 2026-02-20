import {NodeSpecification} from "../../../types/NodeSpecification"
import {DbNodeType} from "../../../types/DbNodeType"

export const GamingPlatformNodeSpecification: NodeSpecification = {
    type: DbNodeType.GamingPlatform,
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
