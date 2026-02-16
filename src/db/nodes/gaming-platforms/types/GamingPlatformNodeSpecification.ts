import {NodeSpecification} from "../../../types/NodeSpecification"
import {NodeTypeLabel} from "../../../NodeTypeLabel"

export const GamingPlatformNodeSpecification: NodeSpecification = {
    label: NodeTypeLabel.GamingPlatform,
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
