import {expect, test} from 'vitest'
import {InputModelCarBrandCreate} from "../../../../../src/db/node-types/model-car-brands/types/InputModelCarBrandCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a MODEL CAR BRAND node', async () => {
    const data: InputModelCarBrandCreate = {
        name: "Hot Wheels",
        founded: 1968,
        defunct: null,
        country_code: 'US',
    }

    const query = createNodeQuery(DbNodeType.ModelCarBrand, data)

    expect(query)
        .toEqual(
            "CREATE (node:ModelCarBrand_A_" + appInstanceId + " {\n" +
            "  name: 'Hot Wheels',\n" +
            "  founded: 1968,\n" +
            "  defunct: null,\n" +
            "  country_code: 'US'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
