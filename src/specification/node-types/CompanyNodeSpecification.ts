import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const CompanyNodeSpecification: NodeSpecification = {
    type: NodeType.Company,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'BMW AG',
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
            name: 'headquarters_location',
            datatype: 'string',
            mandatory: false,
            example: 'Munich',
        },
        {
            name: 'hq_country_code',
            datatype: 'string',
            mandatory: false,
            example: 'DE',
        },
        {
            name: 'legal_headquarters_location',
            datatype: 'string',
            mandatory: false,
            example: 'Munich',
        },
        {
            name: 'legal_hq_country_code',
            datatype: 'string',
            mandatory: false,
            example: 'DE',
        },
    ],
}
