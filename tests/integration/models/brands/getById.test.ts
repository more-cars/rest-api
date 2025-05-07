import {Brand} from "../../../../src/models/Brand"

describe('Brand', () => {
    test('Fetching a brand that does not exist should return "false"', async () => {
        const expectedBrand = false
        const actualBrand = await Brand.findById(-42)

        expect(actualBrand)
            .toBe(expectedBrand)
    })
})
