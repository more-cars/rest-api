import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a MODEL CAR node', async () => {
    const data: QueryInputData = {
        name: "BMW 2002",
        product_code: "DHX60",
        release_year: 2016,
        scale: "1:64",
        series: "BMW",
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
    }

    const query = createNodeQuery(DbNodeType.ModelCar, data)

    expect(query)
        .toEqual(
            "CREATE (n:ModelCar_A_" + appInstanceId + " {\n" +
            "  name: 'BMW 2002',\n" +
            "  product_code: 'DHX60',\n" +
            "  release_year: 2016,\n" +
            "  scale: '1:64',\n" +
            "  series: 'BMW',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
