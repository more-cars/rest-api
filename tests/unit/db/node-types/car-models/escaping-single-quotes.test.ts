import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: QueryInputData = {
        name: "360 'Modena",
        built_from: null,
        built_to: null,
        generation: null,
        internal_code: "F'131",
        total_production: null,
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
    }
    const query = createNodeQuery(DbNodeType.CarModel, data)

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
