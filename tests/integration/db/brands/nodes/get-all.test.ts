import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {BrandNode} from "../../../../../src/db/nodes/brands/types/BrandNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/nodes/brands/getAllNodesOfType"

test('When there are no BRANDS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(NodeTypeEnum.BRAND)

    const expectedBrands: BrandNode[] = []
    const actualBrands = await getAllNodesOfType()

    expect(actualBrands)
        .toEqual(expectedBrands)
})

test('When BRANDS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(NodeTypeEnum.BRAND)
    const amount = Math.ceil(Math.random() * 50)
    await seedNodes(NodeTypeEnum.BRAND, amount)

    const actualBrands = await getAllNodesOfType()

    expect(actualBrands.length)
        .toEqual(amount)
})
