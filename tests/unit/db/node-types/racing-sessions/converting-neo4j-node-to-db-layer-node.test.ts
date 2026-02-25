import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertRacingSessionNeo4jNodeToDbNode} from "../../../../../src/db/node-types/racing-sessions/convertRacingSessionNeo4jNodeToDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {RacingSessionNode} from "../../../../../src/db/node-types/racing-sessions/types/RacingSessionNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "Grand Prix",
            start_date: "2025-05-20",
            start_time: "14:00",
            duration: 120,
            duration_unit: "min",
            distance: 58,
            distance_unit: "laps",
        },
        elementId: "",
    }

    const mappedNode = convertRacingSessionNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.RacingSession,
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "Grand Prix",
                start_date: "2025-05-20",
                start_time: "14:00",
                duration: 120,
                duration_unit: "min",
                distance: 58,
                distance_unit: "laps",
            },
        } satisfies RacingSessionNode)
})
