import {expect, test} from 'vitest'
import {TrackLayoutNode} from "../../../../../src/models/track-layouts/types/TrackLayoutNode"
import {marshalNode} from "../../../../../src/controllers/track-layouts/marshalling/marshalNode"

test("marshalling a TRACK LAYOUT node", async () => {
    const node: TrackLayoutNode = {
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

    const marshalledNode = marshalNode(node)

    expect(marshalledNode)
        .toStrictEqual({
            data: {
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
