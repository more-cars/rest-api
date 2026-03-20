import {expect, test} from 'vitest'
import {InputPriceCreate} from "../../../../../src/db/node-types/prices/types/InputPriceCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a PRICE node', async () => {
    const data: InputPriceCreate = {
        price: 59990,
        price_year: 2020,
        currency_code: "EUR",
        country_code: "DE"
    }

    const query = createNodeQuery(DbNodeType.Price, data)

    expect(query)
        .toEqual(
            "CREATE (node:Price_" + appInstanceId + " {\n" +
            "  price: 59990,\n" +
            "  price_year: 2020,\n" +
            "  currency_code: 'EUR',\n" +
            "  country_code: 'DE'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
