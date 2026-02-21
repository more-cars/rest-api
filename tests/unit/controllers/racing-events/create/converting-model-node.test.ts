import {expect, test} from 'vitest'
import {RacingEventNode} from "../../../../../src/models/node-types/racing-events/types/RacingEventNode"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {convertRacingEventModelNodeToControllerNode} from "../../../../../src/controllers/node-types/racing-events/convertRacingEventModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

test("converting a RACING EVENT node", async () => {
    const node: RacingEventNode = {
        node_type: ModelNodeType.RacingEvent,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "GP Monaco 2025",
            round: 8,
            date_from: "2025-05-25",
            date_to: "2025-05-27",
        }
    }

    const convertedNode = convertRacingEventModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.RacingEvent,
            fields: {
                id: 1,
                name: "GP Monaco 2025",
                round: 8,
                date_from: "2025-05-25",
                date_to: "2025-05-27",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
