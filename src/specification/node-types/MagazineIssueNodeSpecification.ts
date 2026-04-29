import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const MagazineIssueNodeSpecification: NodeSpecification = {
    type: NodeType.MagazineIssue,
    properties: [
        {
            name: 'title',
            datatype: 'string',
            mandatory: true,
            example: 'Sieger-Typen',
        },
        {
            name: 'consecutive_number',
            datatype: 'number',
            mandatory: false,
            example: null,
        },
        {
            name: 'issue_number',
            datatype: 'number',
            mandatory: false,
            example: 11,
        },
        {
            name: 'issue_year',
            datatype: 'number',
            mandatory: false,
            example: 2025,
        },
        {
            name: 'release_date',
            datatype: 'string',
            mandatory: false,
            example: '2025-10-01',
        },
        {
            name: 'single_copy_price',
            datatype: 'number',
            mandatory: false,
            example: 5.4,
        },
        {
            name: 'single_copy_price_unit',
            datatype: 'string',
            mandatory: false,
            example: 'EUR',
        },
        {
            name: 'pages',
            datatype: 'number',
            mandatory: false,
            example: 148,
        },
    ],
}
