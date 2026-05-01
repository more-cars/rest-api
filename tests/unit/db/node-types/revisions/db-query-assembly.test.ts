import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a REVISION node', async () => {
    const data: QueryInputData = {
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
    }

    const query = createNodeQuery(DbNodeType.Revision, data)

    expect(query)
        .toEqual(
            "CREATE (n:Revision_A_" + appInstanceId + " {\n" +
            "  node_type: 'CarModel',\n" +
            "  node_mc_id: 12345678,\n" +
            "  node_created_at: '2024-04-14T11:04:04.493Z',\n" +
            "  node_updated_at: '2024-04-14T11:04:04.493Z',\n" +
            "  name: 'Corolla',\n" +
            "  built_from: 1991,\n" +
            "  built_to: 1997,\n" +
            "  generation: 7,\n" +
            "  internal_code: 'E10',\n" +
            "  total_production: 1234567,\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
