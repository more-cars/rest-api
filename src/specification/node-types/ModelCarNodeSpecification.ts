import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const ModelCarNodeSpecification: NodeSpecification = {
    type: NodeType.ModelCar,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'product_code',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'release_year',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'scale',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'series',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
