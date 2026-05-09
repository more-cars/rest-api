import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const RevisionNodeSpecification: NodeSpecification = {
    type: NodeType.Revision,
    properties: [
        {
            name: 'node_type',
            datatype: 'string',
            mandatory: true,
            example: 'CarModel',
            scope: 'system',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'node_id',
            datatype: 'number',
            mandatory: true,
            example: 12345678,
            scope: 'system',
            validation: ['number'],
        },
        {
            name: 'node_created_at',
            datatype: 'string',
            mandatory: true,
            example: '2024-04-14T11:04:04.493Z',
            scope: 'system',
            validation: ['string'],
        },
        {
            name: 'node_updated_at',
            datatype: 'string',
            mandatory: true,
            example: '2024-04-14T11:04:04.493Z',
            scope: 'system',
            validation: ['string'],
        },
    ],
}
