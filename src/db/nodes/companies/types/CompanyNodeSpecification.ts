import {NodeSpecification} from "../../../types/NodeSpecification"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"

export const CompanyNodeSpecification: NodeSpecification = {
    label: Neo4jNodeType.Company,
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
        {
            name: 'headquarters_location',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'legal_headquarters_location',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
