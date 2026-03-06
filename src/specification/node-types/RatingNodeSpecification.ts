import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const RatingNodeSpecification: NodeSpecification = {
    type: NodeType.Rating,
    properties: [
        {
            name: 'rating_value',
            datatype: 'number',
            mandatory: true,
        },
        {
            name: 'scale_minimum',
            datatype: 'number',
            mandatory: true,
        },
        {
            name: 'scale_maximum',
            datatype: 'number',
            mandatory: true,
        },
        {
            name: 'scale_direction',
            datatype: 'string',
            mandatory: true,
        },
    ],
}
