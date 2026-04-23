import {expect, test} from 'vitest'
import {InputRacingSessionCreate} from "../../../../../src/db/node-types/racing-sessions/types/InputRacingSessionCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

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

    const query = createNodeQuery(DbNodeType.RacingSession, data, "2025-05-14T11:05:07.793Z")

    expect(query)
        .toEqual(
            "CREATE (n:RacingSession_A_" + appInstanceId + " {\n" +
            "  name: '\\'Grand Prix',\n" +
            "  start_date: '\\'2025-05-20',\n" +
            "  start_time: '\\'14:00',\n" +
            "  duration: null,\n" +
            "  duration_unit: '\\'min',\n" +
            "  distance: null,\n" +
            "  distance_unit: '\\'laps',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
