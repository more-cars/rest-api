import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const PriceNodeSpecification: NodeSpecification = {
    type: NodeType.Price,
    properties: [
        {
            name: 'price',
            datatype: 'number',
            mandatory: true,
        },
        {
            name: 'price_year',
            datatype: 'number',
            mandatory: true,
        },
        {
            name: 'currency_code',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'country_code',
            datatype: 'string',
            mandatory: true,
        },
    ],
}
