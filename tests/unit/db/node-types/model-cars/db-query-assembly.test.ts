import {expect, test} from 'vitest'
import {InputModelCarCreate} from "../../../../../src/db/node-types/model-cars/types/InputModelCarCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a MODEL CAR node', async () => {
    const data: InputModelCarCreate = {
        name: "BMW 2002",
        product_code: "DHX60",
        release_year: 2016,
        scale: "1:64",
        series: "BMW"
    }

    const query = createNodeQuery(DbNodeType.ModelCar, data)

    expect(query)
        .toEqual(
            "CREATE (node:ModelCar_" + appInstanceId + " {\n" +
            "  name: 'BMW 2002',\n" +
            "  product_code: 'DHX60',\n" +
            "  release_year: 2016,\n" +
            "  scale: '1:64',\n" +
            "  series: 'BMW'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
