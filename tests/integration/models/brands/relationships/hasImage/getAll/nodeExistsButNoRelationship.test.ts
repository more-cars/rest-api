import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"

test('BRAND exists, but has no ›has-image‹ relationships', async () => {
    const brand = await seedBrand()

    const relationships = await Brand.getAllHasImageRelationships(brand.id)

    expect(relationships.length)
        .toBe(0)
})
