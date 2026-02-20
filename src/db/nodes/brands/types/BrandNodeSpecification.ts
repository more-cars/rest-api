import {NodeSpecification} from "../../../types/NodeSpecification"
import {DbNodeType} from "../../../types/DbNodeType"

export const BrandNodeSpecification: NodeSpecification = {
    type: DbNodeType.Brand,
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
