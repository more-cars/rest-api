import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const ModelCarBrandNodeSpecification: NodeSpecification = {
    type: NodeType.ModelCarBrand,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'founded',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'defunct',
            datatype: 'number',
            mandatory: false,
        },
    ],
}
