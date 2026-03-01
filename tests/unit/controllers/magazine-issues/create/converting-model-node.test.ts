import {expect, test} from 'vitest'
import {MagazineIssueNode} from "../../../../../src/models/node-types/magazine-issues/types/MagazineIssueNode"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {convertMagazineIssueModelNodeToControllerNode} from "../../../../../src/controllers/node-types/magazine-issues/convertMagazineIssueModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../src/controllers/types/ControllerNodeType"

test("converting a MAGAZINE ISSUE node", async () => {
    const node: MagazineIssueNode = {
        node_type: ModelNodeType.MagazineIssue,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            title: "Performance Car of the Year",
            consecutive_number: 402,
            issue_number: 12,
            issue_year: 2025,
            release_date: "2025-11-26",
            single_copy_price: 5.99,
            single_copy_price_unit: "GBP",
            pages: 156,
        },
    }

    const convertedNode = convertMagazineIssueModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.MagazineIssue,
            fields: {
                id: 1,
                title: "Performance Car of the Year",
                consecutive_number: 402,
                issue_number: 12,
                issue_year: 2025,
                release_date: "2025-11-26",
                single_copy_price: 5.99,
                single_copy_price_unit: "GBP",
                pages: 156,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            },
        })
})
