import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: QueryInputData = {
        name: "'Lausitzring",
        opened: null,
        closed: null,
        type: "'permanent race track",
        location: "'Klettwitz",
        geo_position: "'51°32'0\"N 13°55'10\"E",
        country_code: "'DE",
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
    }

    const query = createNodeQuery(DbNodeType.RaceTrack, data)

    expect(query)
        .toEqual(
            "CREATE (n:RaceTrack_A_" + appInstanceId + " {\n" +
            "  name: '\\'Lausitzring',\n" +
            "  opened: null,\n" +
            "  closed: null,\n" +
            "  type: '\\'permanent race track',\n" +
            "  location: '\\'Klettwitz',\n" +
            "  geo_position: '\\'51°32\\'0\"N 13°55\\'10\"E',\n" +
            "  country_code: '\\'DE',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
