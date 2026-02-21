import {expect, test} from 'vitest'
import {RacingSessionNode} from "../../../../../src/models/node-types/racing-sessions/types/RacingSessionNode"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {convertRacingSessionModelNodeToControllerNode} from "../../../../../src/controllers/node-types/racing-sessions/convertRacingSessionModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

test("converting a RACING SESSION node", async () => {
    const node: RacingSessionNode = {
        node_type: ModelNodeType.RacingSession,
        attributes: {
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
    }

    const convertedNode = convertRacingSessionModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.RacingSession,
            fields: {
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
