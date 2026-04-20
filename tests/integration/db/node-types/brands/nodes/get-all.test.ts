import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {BrandNode} from "../../../../../../src/db/node-types/brands/types/BrandNode"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {fetchNodesFromDb} from "../../../../../../src/db/nodes/fetchNodesFromDb"

test('When there are no BRANDS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Brand)

    const expectedBrands: BrandNode[] = []
    const actualBrands = await fetchNodesFromDb(DbNodeType.Brand)

    expect(actualBrands)
        .toEqual(expectedBrands)
})

test('When BRANDS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Brand)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.Brand, amount)

    const actualBrands = await fetchNodesFromDb(DbNodeType.Brand)

    expect(actualBrands.length)
        .toEqual(amount)
})
