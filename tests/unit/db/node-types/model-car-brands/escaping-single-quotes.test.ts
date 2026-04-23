import {expect, test} from 'vitest'
import {InputModelCarBrandCreate} from "../../../../../src/db/node-types/model-car-brands/types/InputModelCarBrandCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputModelCarBrandCreate = {
        name: "'Hot Wheels",
        founded: null,
        defunct: null,
        country_code: "'US",
    }

    const query = createNodeQuery(DbNodeType.ModelCarBrand, data, "2025-05-14T11:05:07.793Z")

    expect(query)
        .toEqual(
            "CREATE (n:ModelCarBrand_A_" + appInstanceId + " {\n" +
            "  name: '\\'Hot Wheels',\n" +
            "  founded: null,\n" +
            "  defunct: null,\n" +
            "  country_code: '\\'US',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
