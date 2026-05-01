import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a RACING EVENT node', async () => {
    const data: QueryInputData = {
        name: "GP Monaco 2025",
        round: 8,
        date_from: "2025-05-25",
        date_to: "2025-05-27",
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
    }

    const query = createNodeQuery(DbNodeType.RacingEvent, data)

    expect(query)
        .toEqual(
            "CREATE (n:RacingEvent_A_" + appInstanceId + " {\n" +
            "  name: 'GP Monaco 2025',\n" +
            "  round: 8,\n" +
            "  date_from: '2025-05-25',\n" +
            "  date_to: '2025-05-27',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
