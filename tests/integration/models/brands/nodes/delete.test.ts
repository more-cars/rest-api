import {expect, test} from 'vitest'
import {Brand} from "../../../../../src/models/brands/Brand"
import {seedBrand} from "../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"

test('Deleting an brand that does not exist should return "false"', async () => {
    const success = await Brand.delete(-42)

    expect(success)
        .toEqual(false)
})

test('When the brand exists it should be deleted', async () => {
    const node = await seedBrand()
    const success = await Brand.delete(node.id)

    expect(success)
        .toEqual(true)
})
