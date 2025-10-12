import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedImages} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImages"

test('A BRAND can have multiple ›has-image‹ relationships', async () => {
    const brand = await seedBrand()
    const imagesAmount = 3
    const images = await seedImages(imagesAmount)

    for (const image of images) {
        await Brand.createHasImageRelationship(brand.id, image.id)
    }

    const relationships = await Brand.getAllHasImageRelationships(brand.id)

    expect(relationships.length)
        .toBe(imagesAmount)
})
