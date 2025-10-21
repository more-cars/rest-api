import {expect, test} from 'vitest'
import {InputTrackLayoutCreate} from "../../../../../src/db/nodes/track-layouts/types/InputTrackLayoutCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/track-layouts/createNode"

test('single quotes are correctly escaped', async () => {
    const data: InputTrackLayoutCreate = {
        name: "'GP Circuit",
        year_from: null,
        year_to: null,
        length: null,
        length_unit: "'km",
        direction: "'clockwise",
        elevation_change: null,
        elevation_change_unit: "'m",
        surface: "'asphalt"
    }

    const query = createNodeQuery(data)

    expect(query)
        .toEqual(
            "CREATE (node:TrackLayout {\n" +
            "  name: '\\'GP Circuit',\n" +
            "  year_from: null,\n" +
            "  year_to: null,\n" +
            "  length: null,\n" +
            "  length_unit: '\\'km',\n" +
            "  direction: '\\'clockwise',\n" +
            "  elevation_change: null,\n" +
            "  elevation_change_unit: '\\'m',\n" +
            "  surface: '\\'asphalt'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
