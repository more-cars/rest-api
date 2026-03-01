import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/node-types/magazine-issues/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        title: "'Performance Car of the Year''",
        consecutive_number: 402,
        issue_number: 12,
        issue_year: 2025,
        release_date: "'2025-11-26''",
        single_copy_price: 5.99,
        single_copy_price_unit: "'GBP''",
        pages: 156,
    }

    const createdNode = await createNode(data)

    expect(createdNode.properties.title)
        .toEqual("'Performance Car of the Year''")

    expect(createdNode.properties.release_date)
        .toEqual("'2025-11-26''")

    expect(createdNode.properties.single_copy_price_unit)
        .toEqual("'GBP''")
})
