import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/node-types/prices/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        price: 59990,
        currency_code: "'EUR''",
        country_code: "'DE''",
    }

    const createdNode = await createNode(data)

    expect(createdNode.properties.currency_code)
        .toEqual("'EUR''")

    expect(createdNode.properties.country_code)
        .toEqual("'DE''")
})
