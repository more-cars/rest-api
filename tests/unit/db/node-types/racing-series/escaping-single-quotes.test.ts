import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: QueryInputData = {
        name: "'Formula 1",
        short_name: "'F1",
        founded: null,
        defunct: null,
        organized_by: "'FIA",
        vehicle_type: "'formula racing cars",
        country_code: "'US",
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
    }

    const query = createNodeQuery(DbNodeType.RacingSeries, data)

    expect(query)
        .toEqual(
            "CREATE (n:RacingSeries_A_" + appInstanceId + " {\n" +
            "  name: '\\'Formula 1',\n" +
            "  short_name: '\\'F1',\n" +
            "  founded: null,\n" +
            "  defunct: null,\n" +
            "  organized_by: '\\'FIA',\n" +
            "  vehicle_type: '\\'formula racing cars',\n" +
            "  country_code: '\\'US',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
