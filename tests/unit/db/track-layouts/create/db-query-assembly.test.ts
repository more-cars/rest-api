import {expect, test} from 'vitest'
import {createNodeQuery} from "../../../../../src/db/nodes/track-layouts/createNode"
import {InputTrackLayoutCreate} from "../../../../../src/db/nodes/track-layouts/types/InputTrackLayoutCreate"

test('database query for creating a TRACK LAYOUT node', async () => {
    const data: InputTrackLayoutCreate = {
        name: "GP Circuit",
        year_from: 1967,
        year_to: 1999,
        length: 7.004,
        length_unit: "km",
        direction: "clockwise",
        elevation_change: 71,
        elevation_change_unit: "m",
        surface: "asphalt"
    }

    const query = createNodeQuery(data)

    expect(query)
        .toEqual(
            "CREATE (node:TrackLayout {\n" +
            "  name: 'GP Circuit',\n" +
            "  year_from: 1967,\n" +
            "  year_to: 1999,\n" +
            "  length: 7.004,\n" +
            "  length_unit: 'km',\n" +
            "  direction: 'clockwise',\n" +
            "  elevation_change: 71,\n" +
            "  elevation_change_unit: 'm',\n" +
            "  surface: 'asphalt'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
