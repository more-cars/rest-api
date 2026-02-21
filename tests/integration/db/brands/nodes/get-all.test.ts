import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {BrandNode} from "../../../../../src/db/nodes/brands/types/BrandNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/nodes/brands/getAllNodesOfType"

test('When there are no BRANDS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.Brand)

    const expectedBrands: BrandNode[] = []
    const actualBrands = await getAllNodesOfType()

    expect(actualBrands)
        .toEqual(expectedBrands)
})

test('When BRANDS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.Brand)
    const amount = Math.ceil(Math.random() * 50)
    await seedNodes(ControllerNodeType.Brand, amount)

    const actualBrands = await getAllNodesOfType()

    expect(actualBrands.length)
        .toEqual(amount)
})
