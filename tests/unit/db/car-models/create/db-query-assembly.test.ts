import {expect, test} from 'vitest'
import {InputCarModelCreate} from "../../../../../src/db/nodes/car-models/types/InputCarModelCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"

test('database query for creating a CAR MODEL node', async () => {
    const data: InputCarModelCreate = {
        name: "360 Modena",
        built_from: 1999,
        built_to: 2005,
        generation: null,
        internal_code: "F131",
        total_production: 16365,
    }
    const query = createNodeQuery(NodeTypeLabel.CarModel, data)

    expect(query)
        .toEqual(
            "CREATE (node:CarModel {\n" +
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
