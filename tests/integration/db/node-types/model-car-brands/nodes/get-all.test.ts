import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {ModelCarBrandNode} from "../../../../../../src/db/node-types/model-car-brands/types/ModelCarBrandNode"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../../src/db/node-types/model-car-brands/getAllNodesOfType"

test('When there are no MODEL CAR BRANDS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.ModelCarBrand)

    const expectedModelCarBrands: ModelCarBrandNode[] = []
    const actualModelCarBrands = await getAllNodesOfType()

    expect(actualModelCarBrands)
        .toEqual(expectedModelCarBrands)
})

test('When MODEL CAR BRANDS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.ModelCarBrand)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.ModelCarBrand, amount)

    const actualModelCarBrands = await getAllNodesOfType()

    expect(actualModelCarBrands.length)
        .toEqual(amount)
})
