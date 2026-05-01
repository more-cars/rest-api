import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a SESSION RESULT node', async () => {
    const data: QueryInputData = {
        position: 1,
        race_number: "44",
        driver_name: "Lewis Hamilton",
        team_name: "Mercedes",
        race_time: "PT1H23M45.678S",
        laps: 51,
        status: "finished",
        points: 25,
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
    }

    const query = createNodeQuery(DbNodeType.SessionResult, data)

    expect(query)
        .toEqual(
            "CREATE (n:SessionResult_A_" + appInstanceId + " {\n" +
            "  position: 1,\n" +
            "  race_number: '44',\n" +
            "  driver_name: 'Lewis Hamilton',\n" +
            "  team_name: 'Mercedes',\n" +
            "  race_time: 'PT1H23M45.678S',\n" +
            "  laps: 51,\n" +
            "  status: 'finished',\n" +
            "  points: 25,\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
