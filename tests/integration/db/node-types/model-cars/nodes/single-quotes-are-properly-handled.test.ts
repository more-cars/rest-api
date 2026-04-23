import {expect, test} from 'vitest'
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {ModelCarNode} from "../../../../../../src/db/node-types/model-cars/types/ModelCarNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'BMW 2002''",
        product_code: "'DHX60''",
        release_year: 2016,
        scale: "'1:64''",
        series: "'BMW''",
    }

    const createdNode = await createNeo4jNode(DbNodeType.ModelCar, data) as ModelCarNode

    expect(createdNode.properties.name)
        .toEqual("'BMW 2002''")

    expect(createdNode.properties.product_code)
        .toEqual("'DHX60''")

    expect(createdNode.properties.scale)
        .toEqual("'1:64''")

    expect(createdNode.properties.series)
        .toEqual("'BMW''")
})
