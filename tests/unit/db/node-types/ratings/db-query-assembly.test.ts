import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a RATING node', async () => {
    const data: QueryInputData = {
        rating_value: 93,
        scale_minimum: 0,
        scale_maximum: 100,
        scale_direction: "up",
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
    }

    const query = createNodeQuery(DbNodeType.Rating, data)

    expect(query)
        .toEqual(
            "CREATE (n:Rating_A_" + appInstanceId + " {\n" +
            "  rating_value: 93,\n" +
            "  scale_minimum: 0,\n" +
            "  scale_maximum: 100,\n" +
            "  scale_direction: 'up',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
