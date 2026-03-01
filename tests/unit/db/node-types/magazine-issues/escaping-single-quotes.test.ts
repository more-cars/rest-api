import {expect, test} from 'vitest'
import {InputMagazineIssueCreate} from "../../../../../src/db/node-types/magazine-issues/types/InputMagazineIssueCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputMagazineIssueCreate = {
        title: "'Performance Car of the Year",
        consecutive_number: null,
        issue_number: null,
        issue_year: null,
        release_date: "'2025-11-26",
        single_copy_price: null,
        single_copy_price_unit: "'GBP",
        pages: null
    }

    const query = createNodeQuery(DbNodeType.MagazineIssue, data)

    expect(query)
        .toEqual(
            "CREATE (node:MagazineIssue_" + appInstanceId + " {\n" +
            "  title: '\\'Performance Car of the Year',\n" +
            "  consecutive_number: null,\n" +
            "  issue_number: null,\n" +
            "  issue_year: null,\n" +
            "  release_date: '\\'2025-11-26',\n" +
            "  single_copy_price: null,\n" +
            "  single_copy_price_unit: '\\'GBP',\n" +
            "  pages: null\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
