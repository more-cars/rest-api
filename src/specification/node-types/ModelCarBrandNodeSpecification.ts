import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const ModelCarBrandNodeSpecification: NodeSpecification = {
    type: NodeType.ModelCarBrand,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'Hot Wheels',
        },
        {
            name: 'founded',
            datatype: 'number',
            mandatory: false,
            example: 1968,
        },
        {
            name: 'defunct',
            datatype: 'number',
            mandatory: false,
            example: null,
        },
        {
            name: 'country_code',
            datatype: 'string',
            mandatory: false,
            example: 'US',
        },
    ],
}
