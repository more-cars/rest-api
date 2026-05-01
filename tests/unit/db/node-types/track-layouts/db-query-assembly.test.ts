import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a TRACK LAYOUT node', async () => {
    const data: QueryInputData = {
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

    const query = createNodeQuery(DbNodeType.TrackLayout, data)

    expect(query)
        .toEqual(
            "CREATE (n:TrackLayout_A_" + appInstanceId + " {\n" +
            "  name: 'GP Circuit',\n" +
            "  year_from: 1967,\n" +
            "  year_to: 1999,\n" +
            "  length: 7.004,\n" +
            "  length_unit: 'km',\n" +
            "  direction: 'clockwise',\n" +
            "  elevation_change: 71,\n" +
            "  elevation_change_unit: 'm',\n" +
            "  surface: 'asphalt',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
