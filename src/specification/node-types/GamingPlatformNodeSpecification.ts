import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const GamingPlatformNodeSpecification: NodeSpecification = {
    type: NodeType.GamingPlatform,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'PlayStation 5',
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'release_year',
            datatype: 'number',
            mandatory: false,
            example: 2020,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'manufacturer',
            datatype: 'string',
            mandatory: false,
            example: 'Sony',
            scope: 'user',
            validation: ['string'],
        },
    ],
}
