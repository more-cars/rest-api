import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertMagazineIssueNeo4jNodeToDbNode} from "../../../../../src/db/node-types/magazine-issues/convertMagazineIssueNeo4jNodeToDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {MagazineIssueNode} from "../../../../../src/db/node-types/magazine-issues/types/MagazineIssueNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
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
        elementId: "",
    }

    const mappedNode = convertMagazineIssueNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.MagazineIssue,
            properties: {
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
        } satisfies MagazineIssueNode)
})
