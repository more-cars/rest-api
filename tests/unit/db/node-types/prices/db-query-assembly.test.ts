import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a PRICE node', async () => {
    const data: QueryInputData = {
        price: 59990,
        price_year: 2020,
        currency_code: "EUR",
        country_code: "DE",
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
    }

    const query = createNodeQuery(DbNodeType.Price, data)

    expect(query)
        .toEqual(
            "CREATE (n:Price_A_" + appInstanceId + " {\n" +
            "  price: 59990,\n" +
            "  price_year: 2020,\n" +
            "  currency_code: 'EUR',\n" +
            "  country_code: 'DE',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
