import {Brand} from "../../../../../src/models/brands/Brand"
import {seedBrand} from "../../../../dbSeeding/brands/nodes/seedBrand"

test('Fetching a brand that does not exist should return "false"', async () => {
    const expectedBrand = false
    const actualBrand = await Brand.findById(-42)

    expect(actualBrand)
        .toEqual(expectedBrand)
})

test('When the brand exists it should be returned', async () => {
    const expectedBrand = await seedBrand()
    const actualBrand = await Brand.findById(expectedBrand.id)

    expect(actualBrand)
        .toEqual(expectedBrand)
})
