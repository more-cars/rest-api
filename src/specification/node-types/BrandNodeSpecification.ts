import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const BrandNodeSpecification: NodeSpecification = {
    type: NodeType.Brand,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'full_name',
            datatype: 'string',
            mandatory: false,
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
        {
            name: 'wmi',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'hsn',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
