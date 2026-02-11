import {expect, test} from 'vitest'
import {Brand} from "../../../../../src/models/brands/Brand"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Fetching a BRAND that does not exist should return "false"', async () => {
    const expectedBrand = false
    const actualBrand = await Brand.findById(-42)

    expect(actualBrand)
        .toEqual(expectedBrand)
})

test('When the BRAND exists it should be returned', async () => {
    const expectedBrand = await seedNode(NodeTypeEnum.BRAND)
    const actualBrand = await Brand.findById(expectedBrand.id)

    expect(actualBrand)
        .toEqual(expectedBrand)
})
