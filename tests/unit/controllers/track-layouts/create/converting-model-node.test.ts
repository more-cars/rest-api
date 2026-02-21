import {expect, test} from 'vitest'
import {TrackLayoutNode} from "../../../../../src/models/node-types/track-layouts/types/TrackLayoutNode"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {convertTrackLayoutModelNodeToControllerNode} from "../../../../../src/controllers/node-types/track-layouts/convertTrackLayoutModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

test("converting a TRACK LAYOUT node", async () => {
    const node: TrackLayoutNode = {
        node_type: ModelNodeType.TrackLayout,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "GP Circuit",
            year_from: 1967,
            year_to: 1999,
            length: 7.004,
            length_unit: "km",
            direction: "clockwise",
            elevation_change: 71,
            elevation_change_unit: "m",
            surface: "asphalt",
        }
    }

    const convertedNode = convertTrackLayoutModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.TrackLayout,
            fields: {
                id: 1,
                name: "GP Circuit",
                year_from: 1967,
                year_to: 1999,
                length: 7.004,
                length_unit: "km",
                direction: "clockwise",
                elevation_change: 71,
                elevation_change_unit: "m",
                surface: "asphalt",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
