import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../../src/db/node-types/prices/getNodeById"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {PriceSchema} from "../../../../../_toolbox/schemas/db/PriceSchema"
import {validateJson} from "../../../../../_toolbox/validateJson"

test('Querying a PRICE that does not exist should return "false"', async () => {
    const expectedPriceNode = false
    const actualPriceNode = await getNodeById(-42)

    expect(actualPriceNode)
        .toBe(expectedPriceNode)
})

test('Querying an existing PRICE should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.Price)
    const priceNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(priceNode, PriceSchema))
        .toBeTruthy()
})
