import {expect, test} from 'vitest'
import {InputRacingSeriesCreate} from "../../../../../src/db/nodes/racing-series/types/InputRacingSeriesCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/racing-series/createNode"

test('single quotes are correctly escaped', async () => {
    const data: InputRacingSeriesCreate = {
        name: "'Formula 1",
        short_name: "'F1",
        founded: null,
        defunct: null,
        organized_by: "'FIA",
        vehicle_type: "'formula racing cars"
    }

    const query = createNodeQuery(data)

    expect(query)
        .toEqual(
            "CREATE (node:RacingSeries {\n" +
            "  name: '\\'Formula 1',\n" +
            "  short_name: '\\'F1',\n" +
            "  founded: null,\n" +
            "  defunct: null,\n" +
            "  organized_by: '\\'FIA',\n" +
            "  vehicle_type: '\\'formula racing cars'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
