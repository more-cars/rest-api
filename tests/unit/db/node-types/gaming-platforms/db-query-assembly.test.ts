import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a GAMING PLATFORM node', async () => {
    const data: QueryInputData = {
        name: "PlayStation 5",
        release_year: 2020,
        manufacturer: "Sony",
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
    }

    const query = createNodeQuery(DbNodeType.GamingPlatform, data)

    expect(query)
        .toEqual(
            "CREATE (n:GamingPlatform_A_" + appInstanceId + " {\n" +
            "  name: 'PlayStation 5',\n" +
            "  release_year: 2020,\n" +
            "  manufacturer: 'Sony',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
