import {expect, test} from 'vitest'
import {InputRacingSessionCreate} from "../../../../../src/db/nodes/racing-sessions/types/InputRacingSessionCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputRacingSessionCreate = {
        name: "'Grand Prix",
        start_date: "'2025-05-20",
        start_time: "'14:00",
        duration: null,
        duration_unit: "'min",
        distance: null,
        distance_unit: "'laps"
    }

    const query = createNodeQuery(NodeTypeLabel.RacingSession, data)

    expect(query)
        .toEqual(
            "CREATE (node:RacingSession {\n" +
            "  name: '\\'Grand Prix',\n" +
            "  start_date: '\\'2025-05-20',\n" +
            "  start_time: '\\'14:00',\n" +
            "  duration: null,\n" +
            "  duration_unit: '\\'min',\n" +
            "  distance: null,\n" +
            "  distance_unit: '\\'laps'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
