import {deleteAllBrands} from "../../../../dbSeeding/deleteAllBrands"
import {BrandNode} from "../../../../../src/types/brands/BrandNode"
import {Brand} from "../../../../../src/models/Brand"
import {seedBrands} from "../../../../dbSeeding/seedBrands"

describe('Brands', () => {
    test('When there are no brands then an empty array should be returned', async () => {
        await deleteAllBrands()

        const expectedBrands: Array<BrandNode> = []
        const actualBrands = await Brand.findAll()

        expect(actualBrands)
            .toEqual(expectedBrands)
    })

    test('When brands exist then all of them should be returned', async () => {
        await deleteAllBrands()
        const amount = Math.ceil(Math.random() * 50)
        await seedBrands(amount)

        const actualBrands = await Brand.findAll()

        expect(actualBrands.length)
            .toEqual(amount)
    })
})
