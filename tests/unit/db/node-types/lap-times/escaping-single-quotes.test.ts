import {expect, test} from 'vitest'
import {InputLapTimeCreate} from "../../../../../src/db/node-types/lap-times/types/InputLapTimeCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputLapTimeCreate = {
        time: "'PT1M33.294S",
        driver_name: "'Klaus Ludwig",
        date: "'1996-08-03"
    }

    const query = createNodeQuery(DbNodeType.LapTime, data, "2025-05-14T11:05:07.793Z")

    expect(query)
        .toEqual(
            "CREATE (n:LapTime_A_" + appInstanceId + " {\n" +
            "  time: '\\'PT1M33.294S',\n" +
            "  driver_name: '\\'Klaus Ludwig',\n" +
            "  date: '\\'1996-08-03',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
