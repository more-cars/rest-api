import {Brand} from "../../../../../src/models/Brand"
import {seedBrand} from "../../../../dbSeeding/brands/nodes/seedBrand"

describe('Brand', () => {
    test('Fetching a brand that does not exist should return "false"', async () => {
        const expectedBrand = false
        const actualBrand = await Brand.findById(-42)

        expect(actualBrand)
            .toEqual(expectedBrand)
    })

    test('When the brand exists it should be returned', async () => {
        const expectedBrand = await seedBrand()
        const actualBrand = await Brand.findById(expectedBrand.id as number)

        expect(actualBrand)
            .toEqual(expectedBrand)
    })
})
