import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import assert from "assert"
import {seedImages} from "../../../../../../dbSeeding/images/nodes/seedImages.ts"

test('A BRAND can have multiple IMAGEs attached to it', async () => {
    const brand = await seedBrand()
    const imagesAmount = 7
    const images = await seedImages(imagesAmount)

    for (const image of images) {
        await Brand.createHasImageRelationship(brand.id, image.id)
    }

    const relationships = await Brand.getRelationshipsForHasImage(brand.id)

    if (!relationships) {
        assert.fail(`Brand #${brand.id} not found.`)
    }

    expect(relationships.length)
        .toBe(imagesAmount)
})
