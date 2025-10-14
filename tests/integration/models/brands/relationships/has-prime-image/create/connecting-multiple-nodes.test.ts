import {expect, test} from 'vitest'
import {seedImages} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImages"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A BRAND cannot have multiple ›has-prime-image‹ relationships', async () => {
    const brand = await seedBrand()
    const imagesAmount = 3
    const images = await seedImages(imagesAmount)

    for (const image of images) {
        await Brand.createHasPrimeImageRelationship(brand.id, image.id)
    }

    const relationships = await getRelationshipsForSpecificNode(brand.id, DbRelationship.BrandHasPrimeImage)

    expect(relationships.length)
        .toBe(1)
})
