import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedImages} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImages"
import {Brand} from "../../../../../../../src/models/brands/Brand"

test('BRAND exists and has ›has-image‹ relationships', async () => {
    const brand = await seedBrand()
    const images = await seedImages(3)

    for (const image of images) {
        await Brand.createHasImageRelationship(brand.id, image.id)
    }

    const relationships = await Brand.getAllHasImageRelationships(brand.id)

    expect(relationships.length)
        .toBe(3)
})
