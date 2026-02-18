import {expect, test} from 'vitest'
import {RacingSessionNode} from "../../../../../src/models/node-types/racing-sessions/types/RacingSessionNode"
import {marshalNode} from "../../../../../src/controllers/node-types/racing-sessions/marshalling/marshalNode"

test("marshalling a RACING SESSION node", async () => {
    const node: RacingSessionNode = {
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
    }

    const marshalledNode = marshalNode(node)

    expect(marshalledNode)
        .toStrictEqual({
            data: {
                id: 1,
                name: "Grand Prix",
                start_date: "2025-05-20",
                start_time: "14:00",
                duration: 120,
                duration_unit: "min",
                distance: 58,
                distance_unit: "laps",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
