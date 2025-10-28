import {expect, test} from 'vitest'
import {createNodeQuery} from "../../../../../src/db/nodes/session-results/createNode"
import {InputSessionResultCreate} from "../../../../../src/db/nodes/session-results/types/InputSessionResultCreate"

test('database query for creating a SESSION RESULT node', async () => {
    const data: InputSessionResultCreate = {
        position: 1,
        race_number: "44",
        driver_name: "Lewis Hamilton",
        team_name: "Mercedes",
        race_time: "PT1H23M45.678S",
        laps: 51,
        status: "finished",
        points: 25
    }

    const query = createNodeQuery(data)

    expect(query)
        .toEqual(
            "CREATE (node:SessionResult {\n" +
            "  position: 1,\n" +
            "  race_number: '44',\n" +
            "  driver_name: 'Lewis Hamilton',\n" +
            "  team_name: 'Mercedes',\n" +
            "  race_time: 'PT1H23M45.678S',\n" +
            "  laps: 51,\n" +
            "  status: 'finished',\n" +
            "  points: 25\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
