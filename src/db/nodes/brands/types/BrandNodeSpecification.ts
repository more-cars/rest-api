import {NodeSpecification} from "../../../types/NodeSpecification"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"

export const BrandNodeSpecification: NodeSpecification = {
    label: Neo4jNodeType.Brand,
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
