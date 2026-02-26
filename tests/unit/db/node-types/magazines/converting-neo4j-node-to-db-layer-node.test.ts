import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertMagazineNeo4jNodeToDbNode} from "../../../../../src/db/node-types/magazines/convertMagazineNeo4jNodeToDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {MagazineNode} from "../../../../../src/db/node-types/magazines/types/MagazineNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "Top Gear",
            founded: 1993,
            defunct: null,
            focus: "sports cars",
            publication_frequency: "monthly",
            single_copy_price: 5.99,
            single_copy_price_unit: "£",
            publication_format: "print",
            circulation: 150884,
            circulation_year: 2013,
            publisher: "Immediate Media Company",
            issn: "1350-9624",
        },
        elementId: "",
    }

    const mappedNode = convertMagazineNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.Magazine,
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "Top Gear",
                founded: 1993,
                defunct: null,
                focus: "sports cars",
                publication_frequency: "monthly",
                single_copy_price: 5.99,
                single_copy_price_unit: "£",
                publication_format: "print",
                circulation: 150884,
                circulation_year: 2013,
                publisher: "Immediate Media Company",
                issn: "1350-9624",
            },
        } satisfies MagazineNode)
})
