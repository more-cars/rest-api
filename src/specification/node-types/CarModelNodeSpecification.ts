import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const CarModelNodeSpecification: NodeSpecification = {
    type: NodeType.CarModel,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'Corvette',
        },
        {
            name: 'built_from',
            datatype: 'number',
            mandatory: false,
            example: 1976,
        },
        {
            name: 'built_to',
            datatype: 'number',
            mandatory: false,
            example: 1987,
        },
        {
            name: 'generation',
            datatype: 'number',
            mandatory: false,
            example: 3,
        },
        {
            name: 'internal_code',
            datatype: 'string',
            mandatory: false,
            example: 'C3',
        },
        {
            name: 'total_production',
            datatype: 'number',
            mandatory: false,
            example: 1234567,
        },
    ],
}
