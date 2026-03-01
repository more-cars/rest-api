import {expect, test} from 'vitest'
import {InputMagazineIssueCreate} from "../../../../../src/db/node-types/magazine-issues/types/InputMagazineIssueCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a MAGAZINE ISSUE node', async () => {
    const data: InputMagazineIssueCreate = {
        title: "Performance Car of the Year",
        consecutive_number: 402,
        issue_number: 12,
        issue_year: 2025,
        release_date: "2025-11-26",
        single_copy_price: 5.99,
        single_copy_price_unit: "GBP",
        pages: 156
    }

    const query = createNodeQuery(DbNodeType.MagazineIssue, data)

    expect(query)
        .toEqual(
            "CREATE (node:MagazineIssue_" + appInstanceId + " {\n" +
            "  title: 'Performance Car of the Year',\n" +
            "  consecutive_number: 402,\n" +
            "  issue_number: 12,\n" +
            "  issue_year: 2025,\n" +
            "  release_date: '2025-11-26',\n" +
            "  single_copy_price: 5.99,\n" +
            "  single_copy_price_unit: 'GBP',\n" +
            "  pages: 156\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
