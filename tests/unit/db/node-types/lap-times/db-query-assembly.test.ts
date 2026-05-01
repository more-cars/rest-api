import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a LAP TIME node', async () => {
    const data: QueryInputData = {
        time: "PT1M33.294S",
        driver_name: "Klaus Ludwig",
        date: "1996-08-03",
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
    }

    const query = createNodeQuery(DbNodeType.LapTime, data)

    expect(query)
        .toEqual(
            "CREATE (n:LapTime_A_" + appInstanceId + " {\n" +
            "  time: 'PT1M33.294S',\n" +
            "  driver_name: 'Klaus Ludwig',\n" +
            "  date: '1996-08-03',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
