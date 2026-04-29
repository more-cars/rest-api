import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const ModelCarNodeSpecification: NodeSpecification = {
    type: NodeType.ModelCar,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'BMW 2002',
        },
        {
            name: 'product_code',
            datatype: 'string',
            mandatory: false,
            example: 'DHX60',
        },
        {
            name: 'release_year',
            datatype: 'number',
            mandatory: false,
            example: 2016,
        },
        {
            name: 'scale',
            datatype: 'string',
            mandatory: false,
            example: '1:64',
        },
        {
            name: 'series',
            datatype: 'string',
            mandatory: false,
            example: 'BMW',
        },
    ],
}
