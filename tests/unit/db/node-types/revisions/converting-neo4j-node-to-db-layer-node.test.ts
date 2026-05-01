import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {convertRevisionNeo4jNodeToDbNode} from "../../../../../src/db/node-types/revisions/convertRevisionNeo4jNodeToDbNode"
import type {RevisionNode} from "../../../../../src/db/node-types/revisions/types/RevisionNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 87654321,
            node_type: 'CarModel',
            node_mc_id: 12345678,
            node_created_at: "2024-04-14T11:04:04.493Z",
            node_updated_at: "2024-04-14T11:04:04.493Z",
            name: 'Corolla',
            built_from: 1991,
            built_to: 1997,
            generation: 7,
            internal_code: 'E10',
            total_production: 1234567,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
        },
        elementId: "",
    }

    const mappedNode = convertRevisionNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.Revision,
            properties: {
                id: 87654321,
                node_type: 'CarModel',
                node_id: 12345678,
                node_created_at: "2024-04-14T11:04:04.493Z",
                node_updated_at: "2024-04-14T11:04:04.493Z",
                name: 'Corolla',
                built_from: 1991,
                built_to: 1997,
                generation: 7,
                internal_code: 'E10',
                total_production: 1234567,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            },
        } satisfies RevisionNode)
})
