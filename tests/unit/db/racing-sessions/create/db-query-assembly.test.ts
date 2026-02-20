import {expect, test} from 'vitest'
import {InputRacingSessionCreate} from "../../../../../src/db/nodes/racing-sessions/types/InputRacingSessionCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {Neo4jNodeType} from "../../../../../src/db/types/Neo4jNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a RACING SESSION node', async () => {
    const data: InputRacingSessionCreate = {
        name: "Grand Prix",
        start_date: "2025-05-20",
        start_time: "14:00",
        duration: 120,
        duration_unit: "min",
        distance: 58,
        distance_unit: "laps"
    }

    const query = createNodeQuery(Neo4jNodeType.RacingSession, data)

    expect(query)
        .toEqual(
            "CREATE (node:RacingSession_" + appInstanceId + " {\n" +
            "  name: 'Grand Prix',\n" +
            "  start_date: '2025-05-20',\n" +
            "  start_time: '14:00',\n" +
            "  duration: 120,\n" +
            "  duration_unit: 'min',\n" +
            "  distance: 58,\n" +
            "  distance_unit: 'laps'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
