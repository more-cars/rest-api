import {expect, test} from 'vitest'
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

test('Fetching a BRAND that does not exist should return "false"', async () => {
    const expectedBrand = false
    const actualBrand = await Brand.findById(-42)

    expect(actualBrand)
        .toEqual(expectedBrand)
})

test('When the BRAND exists it should be returned', async () => {
    const expectedBrand = await seedNode(ControllerNodeType.BRAND)
    const actualBrand = await Brand.findById(expectedBrand.id)

    expect(actualBrand)
        .toEqual(expectedBrand)
})
