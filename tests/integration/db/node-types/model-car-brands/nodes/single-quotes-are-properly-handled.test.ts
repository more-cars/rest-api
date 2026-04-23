import {expect, test} from 'vitest'
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {ModelCarBrandNode} from "../../../../../../src/db/node-types/model-car-brands/types/ModelCarBrandNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'Hot Wheels''",
        founded: 1968,
        defunct: null,
        country_code: "'US''",
    }

    const createdNode = await createNeo4jNode(DbNodeType.ModelCarBrand, data) as ModelCarBrandNode

    expect(createdNode.properties.name)
        .toEqual("'Hot Wheels''")

    expect(createdNode.properties.country_code)
        .toEqual("'US''")
})
