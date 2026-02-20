import {expect, test} from 'vitest'
import {InputRacingSeriesCreate} from "../../../../../src/db/nodes/racing-series/types/InputRacingSeriesCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a RACING SERIES node', async () => {
    const data: InputRacingSeriesCreate = {
        name: "Formula 1",
        short_name: "F1",
        founded: 1950,
        defunct: null,
        organized_by: "FIA",
        vehicle_type: "formula racing cars"
    }

    const query = createNodeQuery(DbNodeType.RacingSeries, data)

    expect(query)
        .toEqual(
            "CREATE (node:RacingSeries_" + appInstanceId + " {\n" +
            "  name: 'Formula 1',\n" +
            "  short_name: 'F1',\n" +
            "  founded: 1950,\n" +
            "  defunct: null,\n" +
            "  organized_by: 'FIA',\n" +
            "  vehicle_type: 'formula racing cars'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
