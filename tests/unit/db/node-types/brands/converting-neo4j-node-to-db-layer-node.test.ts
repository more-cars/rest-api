import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertBrandNeo4jNodeToDbNode} from "../../../../../src/db/node-types/brands/convertBrandNeo4jNodeToDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {BrandNode} from "../../../../../src/db/node-types/brands/types/BrandNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "BMW",
            full_name: "Bayerische Motoren Werke",
            founded: 1916,
            defunct: null,
            wmi: "WBA",
            hsn: "0005",
        },
        elementId: "",
    }

    const mappedNode = convertBrandNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.Brand,
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "BMW",
                full_name: "Bayerische Motoren Werke",
                founded: 1916,
                defunct: null,
                wmi: "WBA",
                hsn: "0005",
            },
        } satisfies BrandNode)
})
