import {expect, test} from 'vitest'
import {InputCarModelCreate} from "../../../../../src/db/nodes/car-models/types/InputCarModelCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {Neo4jNodeType} from "../../../../../src/db/types/Neo4jNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a CAR MODEL node', async () => {
    const data: InputCarModelCreate = {
        name: "360 Modena",
        built_from: 1999,
        built_to: 2005,
        generation: null,
        internal_code: "F131",
        total_production: 16365,
    }
    const query = createNodeQuery(Neo4jNodeType.CarModel, data)

    expect(query)
        .toEqual(
            "CREATE (node:CarModel_" + appInstanceId + " {\n" +
            "  name: '360 Modena',\n" +
            "  built_from: 1999,\n" +
            "  built_to: 2005,\n" +
            "  generation: null,\n" +
            "  internal_code: 'F131',\n" +
            "  total_production: 16365\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
