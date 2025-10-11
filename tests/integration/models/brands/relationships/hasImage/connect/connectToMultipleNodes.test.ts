import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import assert from "assert"
import {seedImages} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImages"

test('A BRAND can have multiple IMAGEs attached to it', async () => {
    const brand = await seedBrand()
    const imagesAmount = 7
    const images = await seedImages(imagesAmount)

    for (const image of images) {
        await Brand.createHasImageRelationship(brand.id, image.id)
    }

    const relationships = await Brand.getAllHasImageRelationships(brand.id)

    if (!relationships) {
        assert.fail(`Brand #${brand.id} not found.`)
    }

    expect(relationships.length)
        .toBe(imagesAmount)
})
