import {expect, test} from 'vitest'
import {InputRacingSeriesCreate} from "../../../../../src/db/node-types/racing-series/types/InputRacingSeriesCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a RACING SERIES node', async () => {
    const data: InputRacingSeriesCreate = {
        name: "Formula 1",
        short_name: "F1",
        founded: 1950,
        defunct: null,
        organized_by: "FIA",
        vehicle_type: "formula racing cars",
        country_code: "US",
    }

    const query = createNodeQuery(DbNodeType.RacingSeries, data, "2025-05-14T11:05:07.793Z")

    expect(query)
        .toEqual(
            "CREATE (n:RacingSeries_A_" + appInstanceId + " {\n" +
            "  name: 'Formula 1',\n" +
            "  short_name: 'F1',\n" +
            "  founded: 1950,\n" +
            "  defunct: null,\n" +
            "  organized_by: 'FIA',\n" +
            "  vehicle_type: 'formula racing cars',\n" +
            "  country_code: 'US',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
