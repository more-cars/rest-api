import {describe, expect, test} from 'vitest'
import {deleteAllBrands} from "../../../../../_toolbox/dbSeeding/brands/nodes/deleteAllBrands"
import type {BrandNode} from "../../../../../../src/models/brands/types/BrandNode"
import {Brand} from "../../../../../../src/models/brands/Brand"
import {seedBrands} from "../../../../../_toolbox/dbSeeding/brands/nodes/seedBrands"

describe('A non-parametrized "get all BRAND nodes" request returns the correct number of nodes', () => {
    test('when there exist NO brand nodes', async () => {
        await deleteAllBrands()

        const expectedNodes: Array<BrandNode> = []
        const actualNodes = await Brand.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist brand nodes', async () => {
        await deleteAllBrands()
        const amount = Math.ceil(Math.random() * 20)
        await seedBrands(amount)

        const actualNodes = await Brand.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
