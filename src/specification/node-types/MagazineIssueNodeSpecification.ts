import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const MagazineIssueNodeSpecification: NodeSpecification = {
    type: NodeType.MagazineIssue,
    properties: [
        {
            name: 'title',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'consecutive_number',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'issue_number',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'issue_year',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'release_date',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'single_copy_price',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'single_copy_price_unit',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'pages',
            datatype: 'number',
            mandatory: false,
        },
    ],
}
