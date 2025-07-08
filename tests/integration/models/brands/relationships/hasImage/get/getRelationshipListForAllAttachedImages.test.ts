import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import assert from "assert"
import {seedImages} from "../../../../../../dbSeeding/images/nodes/seedImages.ts"

test('Requesting a relationship list for all IMAGEs that are connected to a BRAND', async () => {
    const brand = await seedBrand()
    const images = await seedImages(3)

    for (const image of images) {
        await Brand.createHasImageRelationship(brand.id, image.id)
    }

    const relationships = await Brand.getRelationshipsForHasImage(brand.id)

    if (!relationships) {
        assert.fail(`Brand #${brand.id} not found.`)
    }

    expect(relationships.length)
        .toBe(3)
})
