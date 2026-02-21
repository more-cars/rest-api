import {expect, test} from 'vitest'
import {LapTimeNode} from "../../../../../src/models/node-types/lap-times/types/LapTimeNode"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {convertLapTimeModelNodeToControllerNode} from "../../../../../src/controllers/node-types/lap-times/convertLapTimeModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

test("converting a LAP TIME node", async () => {
    const node: LapTimeNode = {
        node_type: ModelNodeType.LapTime,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            time: "PT1M33.294S",
            driver_name: "Klaus Ludwig",
            date: "1996-08-03",
        }
    }

    const convertedNode = convertLapTimeModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.LapTime,
            fields: {
                id: 1,
                time: "PT1M33.294S",
                driver_name: "Klaus Ludwig",
                date: "1996-08-03",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
