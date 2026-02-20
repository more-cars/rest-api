import {expect, test} from 'vitest'
import {InputCarModelCreate} from "../../../../../src/db/nodes/car-models/types/InputCarModelCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {Neo4jNodeType} from "../../../../../src/db/types/Neo4jNodeType"
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
    const query = createNodeQuery(Neo4jNodeType.CarModel, data)

    expect(query)
        .toEqual(
            "CREATE (node:CarModel_" + appInstanceId + " {\n" +
            "  name: '360 \\'Modena',\n" +
            "  built_from: null,\n" +
            "  built_to: null,\n" +
            "  generation: null,\n" +
            "  internal_code: 'F\\'131',\n" +
            "  total_production: null\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
