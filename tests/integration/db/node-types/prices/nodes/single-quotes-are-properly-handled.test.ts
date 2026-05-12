import {expect, test} from 'vitest'
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {PriceNode} from "../../../../../../src/db/node-types/prices/types/PriceNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        price: 59990,
        price_year: 2020,
        currency_code: "'EUR''",
        country_code: "'DE''",
    }

    const createdNode = await createDbNode(DbNodeType.Price, data) as PriceNode

    expect(createdNode.properties.currency_code)
        .toEqual("'EUR''")

    expect(createdNode.properties.country_code)
        .toEqual("'DE''")
})
