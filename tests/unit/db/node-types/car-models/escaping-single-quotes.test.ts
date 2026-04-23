import {expect, test} from 'vitest'
import {InputCarModelCreate} from "../../../../../src/db/node-types/car-models/types/InputCarModelCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputCarModelCreate = {
        name: "360 'Modena",
        built_from: null,
        built_to: null,
        generation: null,
        internal_code: "F'131",
        total_production: null,
    }
    const query = createNodeQuery(DbNodeType.CarModel, data, "2025-05-14T11:05:07.793Z")

    expect(query)
        .toEqual(
            "CREATE (n:CarModel_A_" + appInstanceId + " {\n" +
            "  name: '360 \\'Modena',\n" +
            "  built_from: null,\n" +
            "  built_to: null,\n" +
            "  generation: null,\n" +
            "  internal_code: 'F\\'131',\n" +
            "  total_production: null,\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
