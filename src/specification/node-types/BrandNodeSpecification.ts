import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const BrandNodeSpecification: NodeSpecification = {
    type: NodeType.Brand,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'BMW',
        },
        {
            name: 'full_name',
            datatype: 'string',
            mandatory: false,
            example: 'Bayerische Motoren Werke',
        },
        {
            name: 'founded',
            datatype: 'number',
            mandatory: false,
            example: 1916,
        },
        {
            name: 'defunct',
            datatype: 'number',
            mandatory: false,
            example: null,
        },
        {
            name: 'wmi',
            datatype: 'string',
            mandatory: false,
            example: 'WBA',
        },
        {
            name: 'hsn',
            datatype: 'string',
            mandatory: false,
            example: '0005',
        },
        {
            name: 'country_code',
            datatype: 'string',
            mandatory: false,
            example: 'DE',
        },
    ],
}
