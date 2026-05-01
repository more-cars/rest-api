import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a BRAND node', async () => {
    const data: QueryInputData = {
        name: "Test Brand",
        full_name: "Test Brand Full Name",
        founded: null,
        defunct: 2020,
        wmi: null,
        hsn: "0005",
        country_code: "DE",
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
    }

    const query = createNodeQuery(DbNodeType.Brand, data)

    expect(query)
        .toEqual(
            "CREATE (n:Brand_A_" + appInstanceId + " {\n" +
            "  name: 'Test Brand',\n" +
            "  full_name: 'Test Brand Full Name',\n" +
            "  founded: null,\n" +
            "  defunct: 2020,\n" +
            "  wmi: null,\n" +
            "  hsn: '0005',\n" +
            "  country_code: 'DE',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
