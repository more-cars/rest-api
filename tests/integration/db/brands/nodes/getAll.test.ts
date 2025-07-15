import {deleteAllBrands} from "../../../../_toolbox/dbSeeding/brands/nodes/deleteAllBrands"
import {BrandNode} from "../../../../../src/db/nodes/brands/types/BrandNode"
import {seedBrands} from "../../../../_toolbox/dbSeeding/brands/nodes/seedBrands"
import {getAllNodesOfType} from "../../../../../src/db/nodes/brands/getAllNodesOfType"

test('When there are no brands then an empty array should be returned', async () => {
    await deleteAllBrands()

    const expectedBrands: Array<BrandNode> = []
    const actualBrands = await getAllNodesOfType()

    expect(actualBrands)
        .toEqual(expectedBrands)
})

test('When brands exist then all of them should be returned', async () => {
    await deleteAllBrands()
    const amount = Math.ceil(Math.random() * 50)
    await seedBrands(amount)

    const actualBrands = await getAllNodesOfType()

    expect(actualBrands.length)
        .toEqual(amount)
})
