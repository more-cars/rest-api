import {expect, test} from 'vitest'
import {InputSessionResultCreate} from "../../../../../src/db/nodes/session-results/types/InputSessionResultCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputSessionResultCreate = {
        position: 1,
        race_number: "'44",
        driver_name: "'Lewis Hamilton",
        team_name: "'Mercedes",
        race_time: "'PT1H23M45.678S",
        laps: null,
        status: "'finished",
        points: null
    }

    const query = createNodeQuery(NodeTypeLabel.SessionResult, data)

    expect(query)
        .toEqual(
            "CREATE (node:SessionResult {\n" +
            "  position: 1,\n" +
            "  race_number: '\\'44',\n" +
            "  driver_name: '\\'Lewis Hamilton',\n" +
            "  team_name: '\\'Mercedes',\n" +
            "  race_time: '\\'PT1H23M45.678S',\n" +
            "  laps: null,\n" +
            "  status: '\\'finished',\n" +
            "  points: null\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
