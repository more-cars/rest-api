import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/node-types/model-cars/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'BMW 2002''",
        product_code: "'DHX60''",
        release_year: 2016,
        scale: "'1:64''",
        series: "'BMW''",
    }

    const createdNode = await createNode(data)

    expect(createdNode.properties.name)
        .toEqual("'BMW 2002''")

    expect(createdNode.properties.product_code)
        .toEqual("'DHX60''")

    expect(createdNode.properties.scale)
        .toEqual("'1:64''")

    expect(createdNode.properties.series)
        .toEqual("'BMW''")
})
