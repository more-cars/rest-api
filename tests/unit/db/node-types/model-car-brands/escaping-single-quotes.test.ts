import {expect, test} from 'vitest'
import {InputModelCarBrandCreate} from "../../../../../src/db/node-types/model-car-brands/types/InputModelCarBrandCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputModelCarBrandCreate = {
        name: "'Hot Wheels",
        founded: null,
        defunct: null
    }

    const query = createNodeQuery(DbNodeType.ModelCarBrand, data)

    expect(query)
        .toEqual(
            "CREATE (node:ModelCarBrand_" + appInstanceId + " {\n" +
            "  name: '\\'Hot Wheels',\n" +
            "  founded: null,\n" +
            "  defunct: null\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
